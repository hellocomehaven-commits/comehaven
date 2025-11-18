"use server"; // Menandakan semua fungsi di file ini adalah Server Actions

import { z } from 'zod';

// 1. Definisikan Skema Validasi (Checklist Keamanan)

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  subject: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters long" }),
});

const newsletterSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

// 2. Definisikan Tipe Respon Formulir
export type FormState = {
  status: 'idle' | 'success' | 'error';
  message: string;
};

const initialState: FormState = {
  status: 'idle',
  message: '',
};

// 3. Buat Server Action untuk Formulir Kontak
export async function submitContactForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // 3.1. Validasi Input (Wajib)
  const validatedFields = contactSchema.safeParse({
    name: formData.get('contact-name'),
    email: formData.get('contact-email'),
    subject: formData.get('contact-subject'),
    message: formData.get('message'),
  });

  // 3.2. Kembalikan Error Validasi
  if (!validatedFields.success) {
    return {
      status: 'error',
      message: validatedFields.error.issues[0].message,
    };
  }

  // 3.3. Logika Bisnis (TODO: Kirim Email)
  try {
    // Di sinilah Anda akan mengintegrasikan Resend, SendGrid, atau Nodemailer
    // Contoh: await resend.emails.send({ ... validatedFields.data ... });
    
    // JANGAN PERNAH log data sensitif (PII) di production!
    console.log("Formulir Kontak Diterima (Simulasi):", validatedFields.data);

    // TODO: Implementasikan Rate-Limiting per-IP di sini (Checklist Keamanan)

    return { status: 'success', message: 'Message sent successfully!' };

  } catch (e) {
    // 3.4. Error Handling Konsisten (Checklist Keamanan)
    console.error(e);
    return { status: 'error', message: 'An internal error occurred. Please try again.' };
  }
}


// 4. Buat Server Action untuk Formulir Subscribe
export async function subscribeNewsletter(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // 4.1. Validasi Input
  const validatedFields = newsletterSchema.safeParse({
    email: formData.get('subscribe-email'),
  });

  if (!validatedFields.success) {
    return {
      status: 'error',
      message: validatedFields.error.issues[0].message,
    };
  }
  
  // 4.2. Logika Bisnis (TODO: Simpan ke Database/Mailchimp)
  try {
    console.log("Email Berlangganan (Simulasi):", validatedFields.data.email);
    // TODO: Implementasikan API Mailchimp atau simpan ke DB

    return { status: 'success', message: 'Subscribed successfully!' };
  } catch (e) {
    console.error(e);
    return { status: 'error', message: 'An internal error occurred.' };
  }
}