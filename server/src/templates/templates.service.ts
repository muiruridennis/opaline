import { Injectable } from '@nestjs/common';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

@Injectable()
export class TemplateService {
    getTemplate(templateName: string, replacements: Record<string, string>): string {
        const templatePath = resolve(__dirname, '..', 'templates', templateName);

        // Check if the template file exists
        if (!existsSync(templatePath)) {
            throw new Error(`Template file not found: ${templatePath}`);
        }

        // Read the template content
        let template = readFileSync(templatePath, 'utf8');

        // Replace placeholders with actual values
        for (const [key, value] of Object.entries(replacements)) {
            const regex = new RegExp(`{{${key}}}`, 'g');
            template = template.replace(regex, value);
        }

        return template;
    }
}
