// src/services/openaiService.js

import axios from 'axios';

// Función para hacer la llamada a OpenAI
export const obtenerRespuestaDeOpenAI = async (mensaje) => {
    if (!process.env.OPENAI_API_KEY) {
        throw new Error('API key de OpenAI no está configurada en las variables de entorno.');
    }

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: mensaje }],
                temperature: 0.7, // Controla la aleatoriedad de la respuesta
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.data && response.data.choices && response.data.choices.length > 0) {
            return response.data.choices[0].message.content; // Devuelve el contenido de la respuesta
        } else {
            throw new Error('No se recibió una respuesta válida de OpenAI.');
        }
    } catch (error) {
        if (error.response && error.response.data.error && error.response.data.error.code === 'insufficient_quota') {
            console.error('Error: Quota insuficiente. Por favor, revisa tu plan y detalles de facturación.');
        } else {
            console.error('Error al conectar con OpenAI:', error.response ? error.response.data : error.message);
        }
        throw new Error('Hubo un error al obtener la respuesta de OpenAI.');
    }
};
