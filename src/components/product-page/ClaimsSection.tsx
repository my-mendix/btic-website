import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./ClaimsSection.module.css";

// Types (adjust as needed)
interface RichTextNode {
  type: string;
  children: { type: string; text: string }[];
}
interface ClaimButton {
  id: number;
  label: string;
  url: string;
}
interface ClaimsSectionProps {
  data: {
    __component: string;
    id: number;
    title: string;
    shortDescription: RichTextNode[];
    image: {
      url: string;
      alternativeText?: string | null;
      width: number;
      height: number;
    };
    buttons: ClaimButton[];
  };
}

// Helper to get full image URL (adjust if you use absolute URLs already)
function getStrapiMedia(url: string): string {
  if (!url) return "";
  // If the image url is already absolute, return as is.
  if (url.startsWith("http")) return url;
  // Else, prepend your media base URL (adjust if different)
  return `${process.env.NEXT_PUBLIC_STRAPI_URL || ""}${url}`;
}

// Basic rendering of simple richtext
function renderRichText(nodes: RichTextNode[]) {
  return nodes.map((node, idx) => 
    <p key={idx}>
      {node.children.map(child => child.text)}
    </p>
  );
}

const ClaimsSection: React.FC<ClaimsSectionProps> = ({ data }) => {
  const imageUrl = getStrapiMedia(data.image?.url) || '/images/travel_images/travel-claims.png';
    console.log('Cliam Section imageUrl :', imageUrl);
  const button = data.buttons[0]; // Only the first button shown in screenshot

  return (
    <section className={styles.claimsSection}>
      <div className={styles.claimsGrid}>
        <div className={styles.claimsImage}>
          <Image
            src={imageUrl}
            alt={data.image?.alternativeText || "Claims form"}
            width={430}
            height={290}
            className={styles.claimImageTag}
            priority
          />
        </div>
        <div className={styles.claimsContent}>
          <h2 className={styles.claimsTitle}>{data.title}</h2>
          <div className={styles.claimsDescription}>
            {renderRichText(data.shortDescription)}
          </div>
          {button && (
            <Link href={button.url} className={styles.claimsButton}>
              {button.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default ClaimsSection;
