
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Agent {
  id: string;
  name: string;
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
  standalone:true,
  selector: 'app-gpt',
  styleUrl: './gpt.scss',
  templateUrl: './gpt.html',
})


export class Gpt {

  agents: Agent[] = [];
  conversationId = crypto.randomUUID();

  selectedAgentId = '';

  messageText = '';

  messages: ChatMessage[] = [];

  selectedImage: File | null = null;

  selectedImagePreview: string | null = null;

  isLoading = false;


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
  
          if (Array.isArray(data.agents)) {
  
            this.agents = data.agents;
  
            console.log(
              'Agentes cargados:',
              this.agents
            );
  
          } else {
  
            console.error(
              'La respuesta no contiene un arreglo:',
              data
            );
  
            this.agents = [];
          }
        },
  
        error: (error) => {
  
          console.error(
            'Error obteniendo agentes:',
            error
          );
  
          this.agents = [];
        }
      });
  }

  /*
   * Cambiar de agente.
   *
   * Al cambiar de agente podemos limpiar
   * la conversación actual.
   */
  changeAgent(): void {

    this.messages = [];

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
      return;
    }

    this.selectedImage = file;

    this.selectedImagePreview =
      URL.createObjectURL(file);
  }


  /*
   * Eliminar imagen seleccionada.
   */
  removeImage(): void {

    this.selectedImage = null;

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

    // Evitar peticiones simultáneas
    if (this.isLoading) {
      return;
    }
  
    // Validar que se haya seleccionado un agente
    if (!this.selectedAgentId) {
      console.error('Debe seleccionar un agente.');
      return;
    }
  
    const text = this.messageText.trim();
  
    // Ambos controladores requieren un prompt
    if (!text) {
      console.error('Debe escribir un mensaje.');
      return;
    }
  
    // El agente de visión requiere una imagen
    if (
      this.selectedAgentId === 'vision' &&
      !this.selectedImage
    ) {
      console.error('Debe seleccionar una imagen.');
      return;
    }
  
    // Preparar el mensaje del usuario
    const userMessage: ChatMessage = {
      role: 'user',
      content: text,
      image: this.selectedImagePreview ?? undefined
    };
  
    // Preparar la petición según el agente
    let request$;
  
    if (this.selectedAgentId === 'text') {
  
      request$ = this.http.post<{
        response: string;
        conversation_id: string;
      }>(
        '/api/generate-text',
        {
          prompt: text,
          conversation_id: this.conversationId
        }
      );
  
    } else if (this.selectedAgentId === 'vision') {
  
      const formData = new FormData();
  
      formData.append('prompt', text);
  
      formData.append(
        'conversation_id',
        this.conversationId
      );
  
      formData.append(
        'image',
        this.selectedImage!
      );
  
      request$ = this.http.post<{
        ok: boolean;
        message: string;
        response: string;
        conversation_id: string;
      }>(
        '/api/vision/analyze',
        formData
      );
  
    } else {
  
      console.error('Agente no reconocido.');
      return;
    }
  
    // Mostrar el mensaje del usuario
    this.messages.push(userMessage);
  
    this.isLoading = true;
  
    // Enviar la petición a Flask
    request$.subscribe({
  
      next: (response) => {
  
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
