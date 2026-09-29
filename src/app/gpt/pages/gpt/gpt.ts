
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Agent {
  id: string;
  name: string;
  description?: string;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  image?: string;
}

@Component({
  imports: [
    CommonModule,
    FormsModule
  ],
  standalone: true,
  selector: 'app-gpt',
  styleUrl: './gpt.scss',
  templateUrl: './gpt.html',
})
export class Gpt {

  agents: Agent[] = [];

  selectedAgentId = '';

  messageText = '';

  messages: ChatMessage[] = [];

  selectedImage: File | null = null;

  selectedImagePreview: string | null = null;

  isLoading = false;

  // Las peticiones utilizan el proxy de Angular.
  private apiUrl = '/api';

  conversationId = crypto.randomUUID();

  constructor(
    private http: HttpClient
  ) {
    this.loadAgents();
  }

  /*
   * Obtener los agentes disponibles
   * desde el backend.
   */
  loadAgents(): void {

    this.http
      .get<{ agents: Agent[] }>('/api/agents')
      .subscribe({
  
        next: (data) => {
          console.log('Respuesta:', data);
          console.log('¿Es un arreglo?', Array.isArray(data.agents));
        
          this.agents = Array.isArray(data.agents)
            ? data.agents
            : [];
        },
  
        error: (error) => {
  
          console.error(
            'Error obteniendo agentes:',
            error
          );
        }
      });
  }

  /*
   * Cambiar de agente.
   */
  changeAgent(): void {

    this.messageText = '';

    this.removeImage();
  }

  /*
   * Seleccionar imagen.
   */
  onImageSelected(event: Event): void {

    const input =
      event.target as HTMLInputElement;

    const file = input.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {

      console.error(
        'El archivo seleccionado no es una imagen.'
      );

      return;
    }

    this.selectedImage = file;

    if (this.selectedImagePreview) {
      URL.revokeObjectURL(this.selectedImagePreview);
    }

    this.selectedImagePreview =
      URL.createObjectURL(file);
  }

  /*
   * Eliminar imagen seleccionada.
   */
  removeImage(): void {

    this.selectedImage = null;

    if (this.selectedImagePreview) {
      URL.revokeObjectURL(this.selectedImagePreview);
    }

    this.selectedImagePreview = null;
  }

  /*
   * Manejar Enter.
   */
  handleEnter(event: Event): void {

    const keyboardEvent =
      event as KeyboardEvent;

    if (!keyboardEvent.shiftKey) {

      keyboardEvent.preventDefault();

      this.sendMessage();
    }
  }

  /*
   * Enviar mensaje al agente.
   */
  sendMessage(): void {

    // 1. Evitar peticiones simultáneas.

    if (this.isLoading) {
      return;
    }

    // 2. Validar el agente.

    if (!this.selectedAgentId) {

      console.error(
        'Debe seleccionar un agente.'
      );

      return;
    }

    const text = this.messageText.trim();

    // 3. Validar el mensaje.

    if (!text) {

      console.error(
        'Debe escribir un mensaje.'
      );

      return;
    }

    // 4. Validar imagen para el agente de visión.

    if (
      this.selectedAgentId === 'vision' &&
      !this.selectedImage
    ) {

      console.error(
        'Debe seleccionar una imagen.'
      );

      return;
    }

    // 5. Preparar el mensaje del usuario.

    const userMessage: ChatMessage = {

      role: 'user',

      content: text,

      image: this.selectedImagePreview ?? undefined
    };

    // 6. Preparar la petición.

    let request$;

    if (this.selectedAgentId === 'vision') {

      const formData = new FormData();

      formData.append(
        'prompt',
        text
      );

      formData.append(
        'conversation_id',
        this.conversationId
      );

      formData.append(
        'image',
        this.selectedImage!
      );

      request$ = this.http.post<{
        response: string;
        conversation_id: string;
      }>(
        `${this.apiUrl}/vision/analyze`,
        formData
      );

    } else if (this.selectedAgentId === 'text') {

      request$ = this.http.post<{
        response: string;
        conversation_id: string;
      }>(
        `${this.apiUrl}/generate-text`,
        {
          prompt: text,
          conversation_id: this.conversationId
        }
      );

    } else {

      console.error(
        'Agente no reconocido.'
      );

      return;
    }

    // 7. Enviar la petición.

    this.isLoading = true;

    request$.subscribe({

      next: (response) => {

        this.messages.push(userMessage);

        this.messages.push({

          role: 'assistant',

          content: response.response
        });

        this.messageText = '';

        this.removeImage();

        this.isLoading = false;
      },

      error: (error) => {

        console.error(
          'Error enviando mensaje:',
          error
        );

        this.messages.push({

          role: 'assistant',

          content:
            'No fue posible obtener una respuesta del agente.'
        });

        this.isLoading = false;
      }
    });
  }
}
