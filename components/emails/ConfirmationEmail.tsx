import * as React from 'react';
import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Section,
    Text,
    Link,
} from '@react-email/components';

interface EmailTemplateProps {
    organisation: string;
    name: string;
    email: string;
    message: string;
}

export const ConfirmationEmail: React.FC<Readonly<EmailTemplateProps>> = ({
    organisation,
    name,
    email,
    message
}) => (
    <Html>
        <Head />
        <Preview>Thank you for contacting QuickFeed. We've received your message.</Preview>
        <Body style={main}>
            <Container style={container}>
                <Heading style={h1}>Thank You for Contacting Us</Heading>
                <Text style={text}>
                    Dear {name},
                </Text>
                <Text style={text}>
                    We have received your message and appreciate you taking the time to reach out to us. Our team will review your inquiry and get back to you as soon as possible.
                </Text>
                <Section style={detailsSection}>
                    <Text style={detailHeading}>Your Message Details:</Text>
                    <Text style={detailText}>
                        <strong>Name:</strong> {name}
                    </Text>
                    <Text style={detailText}>
                        <strong>Organisation:</strong> {organisation}
                    </Text>
                    <Text style={detailText}>
                        <strong>Email:</strong> {email}
                    </Text>
                    <Hr style={detailSeparator} />
                    <Text style={detailText}>
                        <strong>Your Message:</strong>
                    </Text>
                    <Text style={messageText}>{message}</Text>
                </Section>
                <Text style={text}>
                    We typically respond to inquiries within 1-2 business days. If your matter is urgent, please don`t hesitate to call us at +1 (555) 123-4567.
                </Text>
                <Button style={button} href="https://quickfeed.com/contact">
                    Visit Our Contact Page
                </Button>
                <Hr style={hr} />
                <Text style={footerText}>
                    This is an automated confirmation. Please do not reply to this email.
                </Text>
            </Container>
        </Body>
    </Html>
);

export default ConfirmationEmail;

const main = {
    backgroundColor: '#1f2937',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
    padding: '40px 0',
};

const container = {
    backgroundColor: '#111827',
    borderRadius: '8px',
    margin: '0 auto',
    padding: '40px 0',
    width: '100%',
    maxWidth: '600px',
};

const h1 = {
    color: '#f3f4f6',
    fontSize: '24px',
    fontWeight: 'bold',
    lineHeight: '24px',
    padding: '0 48px',
    textAlign: 'center' as const,
    margin: '0 0 40px',
};

const text = {
    color: '#d1d5db',
    fontSize: '14px',
    lineHeight: '24px',
    margin: '0 0 16px',
    padding: '0 48px',
};

const detailsSection = {
    backgroundColor: '#1e293b',
    borderRadius: '4px',
    margin: '0 0 24px',
    padding: '24px',
};

const detailHeading = {
    color: '#f3f4f6',
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0 0 12px',
};

const detailText = {
    color: '#d1d5db',
    fontSize: '14px',
    lineHeight: '24px',
    margin: '0 0 4px',
};

const messageText = {
    color: '#d1d5db',
    fontSize: '14px',
    lineHeight: '24px',
    margin: '8px 0 0',
    whiteSpace: 'pre-wrap' as const,
};

const button = {
    backgroundColor: '#3b82f6',
    borderRadius: '4px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    width: 'auto',
    padding: '12px 24px',
    margin: '32px auto 0',
};

const footerText = {
    color: '#6b7280',
    fontSize: '12px',
    lineHeight: '16px',
    padding: '0 48px',
    textAlign: 'center' as const,
    margin: '24px 0 0',
};

const hr = {
    borderColor: '#374151',
    margin: '32px 0',
};

const detailSeparator = {
    borderColor: '#374151',
    margin: '16px 0',
};