"use client";
import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import styles from "./RequestQuotationForm.module.css";

type FormData = {
  name: string;
  company: string;
  email: string;
  contactNumber: string;
  message: string;
};

const initial: FormData = {
  name: "",
  company: "",
  email: "",
  contactNumber: "",
  message: "",
};

interface RequestQuotationFormProps { 
     lang: string;
}   

const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;

const RequestQuotationForm: React.FC<RequestQuotationFormProps> = ({lang}) => {
    const isArabic = lang === 'ar';

    const translations = {
        ar: {
            title: "طلب عرض أسعار",
            name: "الاسم",
            company: "الشركة",
            email: "البريد الإلكتروني",
            contactNumber: "رقم الاتصال",
            message: "الرسالة",
            submit: "إرسال",
            submitting: "جاري الإرسال...",
            recaptchaError: "يرجى إكمال reCAPTCHA.",
            recaptchaValidationError: "فشل التحقق من reCAPTCHA. يرجى المحاولة مرة أخرى.",
            submissionError: "حدث خطأ ما. يرجى المحاولة مرة أخرى في وقت لاحق.",
            submissionSuccess: "تم إرسال طلبك بنجاح!",
        },
        en: {
            title: "Request For Quotation",
            name: "Name",
            company: "Company",
            email: "Email",
            contactNumber: "Contact Number",
            message: "Message",
            submit: "Submit",
            submitting: "Submitting...",
            recaptchaError: "Please complete the reCAPTCHA.",
            recaptchaValidationError: "reCAPTCHA validation failed. Please try again.",
            submissionError: "Something went wrong. Please try again later.",
            submissionSuccess: "Your request has been submitted!",
        },
    };

    const t = translations[lang === 'ar' ? 'ar' : 'en'];
  const [form, setForm] = useState<FormData>(initial);
  const [loading, setLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [errors, setErrors] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const onInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(null);

    if (!recaptchaToken) {
      setErrors(t.recaptchaError);
      return;
    }

    setLoading(true);
    try {
      // Verify reCAPTCHA on the server
      const verifyRes = await fetch("/api/verify-recaptcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: recaptchaToken }),
      });
      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        setErrors(t.recaptchaValidationError);
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);
        setLoading(false);
        return;
      }
      // Submit your form data to your main API/server here!
      // await fetch(...);

      // Show a thank you, reset form, etc:
      setForm(initial);
      setRecaptchaToken(null);
      recaptchaRef.current?.reset();
      alert(t.submissionSuccess);
    } catch (error) {
        console.error("Error submitting form:", error);
      setErrors(t.submissionError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container} dir={isArabic ? 'rtl' : 'ltr'}>
      <form className={styles.form} onSubmit={onSubmit} autoComplete="off">
        <h2 className={styles.title}>{t.title}</h2>
        <div className={styles.row}>
          <div className={styles.col}>
            <label>{t.name}<span className={styles.req}>*</span>
              <input type="text" name="name" required value={form.name} onChange={onInput} className={styles.input} />
            </label>
          </div>
          <div className={styles.col}>
            <label>{t.company}<span className={styles.req}>*</span>
              <input type="text" name="company" required value={form.company} onChange={onInput} className={styles.input} />
            </label>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            <label>{t.email}<span className={styles.req}>*</span>
              <input type="email" name="email" required value={form.email} onChange={onInput} className={styles.input} />
            </label>
          </div>
          <div className={styles.col}>
            <label>{t.contactNumber}<span className={styles.req}>*</span>
              <input type="tel" name="contactNumber" required value={form.contactNumber} onChange={onInput} className={styles.input} />
            </label>
          </div>
        </div>
        <label>
          {t.message}<span className={styles.req}>*</span>
          <textarea name="message" rows={4} required value={form.message} onChange={onInput} className={styles.textarea} />
        </label>
        <div className={styles.captchaRow}>
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={siteKey}
            onChange={token => setRecaptchaToken(token)}
            onExpired={() => setRecaptchaToken(null)}
          />
        </div>
        {errors && <div style={{ color: "#e53935", margin: "10px 0" }}>{errors}</div>}
        <div className={styles.btnRow}>
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? t.submitting : t.submit}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestQuotationForm;
