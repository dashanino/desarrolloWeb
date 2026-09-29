
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
      .get<Agent[]>('/api/agents')
      .subscribe({
        next: (agents) => {
          this.agents = agents;
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

    if (this.isLoading) {
      return;
    }

    if (
      !this.messageText.trim() &&
      !this.selectedImage
    ) {
      return;
    }

    if (!this.selectedAgentId) {
      console.error(
        'Debe seleccionar un agente.'
      );

      return;
    }


    const text = this.messageText.trim();

    /*
     * Guardamos el mensaje inmediatamente
     * en la conversación.
     */
    const userMessage: ChatMessage = {
      role: 'user',
      content: text,
      image: this.selectedImagePreview ?? undefined
    };

    this.messages.push(userMessage);


    /*
     * FormData permite mandar texto
     * + imagen en la misma petición.
     */
    const formData = new FormData();

    formData.append(
      'agent_id',
      this.selectedAgentId
    );

    formData.append(
      'message',
      text
    );


    /*
     * Enviamos TODO el historial.
     *
     * Esto permite que el backend conserve
     * el contexto de la conversación.
     */
    formData.append(
      'history',
      JSON.stringify(this.messages)
    );


    if (this.selectedImage) {

      formData.append(
        'image',
        this.selectedImage
      );
    }


    this.isLoading = true;


    this.http
      .post<{ response: string }>(
        '/api/chat',
        formData
      )
      .subscribe({

        next: (response) => {

          this.messages.push({
            role: 'assistant',
            content: response.response
          });

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


    /*
     * Limpiar input.
     */
    this.messageText = '';

    this.removeImage();
  }
}