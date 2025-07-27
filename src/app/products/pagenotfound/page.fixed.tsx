import Header from '@/components/Layouts/Header';
import SubHeader from '@/components/Layouts/SubHeader';
import Footer from '@/components/Layouts/Footer';
import Link from 'next/link';
import styles from './404.module.css';

export default function NotFound() {
  return (
    <>
      <Header />
      <SubHeader />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.left}>
            <h1 className={styles.title}>Looking for something?</h1>
            <p className={styles.subtitle}>We're sorry. The Web address you entered is not a functioning page on our site.</p>
            <p className={styles.link}>
              Go to <Link href="/">Boubyan Takaful's Home Page</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
