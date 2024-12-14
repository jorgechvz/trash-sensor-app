import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AlertService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  // Función para construir el template HTML con múltiples alertas
  private buildEmailTemplate(alerts: string[], data: any): string {
    const alertItems = alerts.map((alert) => `<li>${alert}</li>`).join(''); // Convierte las alertas en una lista HTML

    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Alerta de Contenedor</title>
      <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
        .header { background-color: #4caf50; color: #ffffff; padding: 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { padding: 20px; color: #333333; font-size: 16px; line-height: 1.5; }
        .alert-box { margin: 20px 0; padding: 15px; background-color: #ffebee; color: #b71c1c; border: 1px solid #f44336; border-radius: 4px; }
        .footer { text-align: center; padding: 10px; font-size: 12px; color: #777777; border-top: 1px solid #ddd; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Alerta de Contenedor</h1>
        </div>
        <div class="content">
          <p>Hola,</p>
          <p>Se han detectado las siguientes alertas en el contenedor <strong>ID: ${data.containerId}</strong>:</p>
          <div class="alert-box">
            <ul>${alertItems}</ul>
          </div>
          <p>Por favor, tome las acciones necesarias lo antes posible.</p>
        </div>
        <div class="footer">
          <p>Este es un mensaje automático. No responda a este correo.</p>
          <p>&copy; 2024 TRASH | Gestión Inteligente de Residuos</p>
        </div>
      </div>
    </body>
    </html>
    `;
  }

  // Función para enviar el correo consolidado con HTML
  async sendConsolidatedAlertEmail(
    to: string,
    subject: string,
    alerts: string[],
    data: any,
  ): Promise<void> {
    const htmlContent = this.buildEmailTemplate(alerts, data);

    await this.transporter.sendMail({
      from: `"Smart Container Alerts" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: htmlContent,
    });

    console.log(`Correo consolidado enviado a ${to}`);
  }

  // Procesar los datos y consolidar alertas
  async processSensorData(data: any): Promise<void> {
    const {
      temperature,
      humidity,
      carbonMonoxide,
      fillLevel,
      recipientEmail,
      containerId,
    } = data;

    const ALERT_THRESHOLDS = {
      temperature: 45,
      humidity: 40,
      carbonMonoxide: 45,
      fillLevel: 90,
    };

    const alerts: string[] = [];

    if (fillLevel >= ALERT_THRESHOLDS.fillLevel) {
      alerts.push(
        `Nivel de llenado: ${fillLevel}% (Máximo permitido: ${ALERT_THRESHOLDS.fillLevel}%)`,
      );
    }

    if (temperature > ALERT_THRESHOLDS.temperature) {
      alerts.push(
        `Alta Temperatura: ${temperature}°C (Umbral: ${ALERT_THRESHOLDS.temperature}°C)`,
      );
    }

    if (humidity > ALERT_THRESHOLDS.humidity) {
      alerts.push(
        `Alta Humedad: ${humidity}% (Umbral: ${ALERT_THRESHOLDS.humidity}%)`,
      );
    }

    if (carbonMonoxide > ALERT_THRESHOLDS.carbonMonoxide) {
      alerts.push(
        `Monóxido de Carbono Elevado: ${carbonMonoxide} ppm (Umbral: ${ALERT_THRESHOLDS.carbonMonoxide} ppm)`,
      );
    }

    // Solo enviar correo si hay alertas
    if (alerts.length > 0) {
      await this.sendConsolidatedAlertEmail(
        recipientEmail,
        'Alerta Consolidada del Contenedor',
        alerts,
        { ...data, containerId },
      );
    }
  }
}
