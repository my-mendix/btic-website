import { RichTextNode } from "@/types/strapiResponseDataTypes";;
import styles from '@/app/ProductPage.module.css';

const RichTextBlock = ({ nodes }: { nodes: RichTextNode[] }) => (
  <>
    {nodes?.map((node, i) => (
      <p key={i} className={styles.paragraph}>
        {node.children?.map((child, j) => (
          <span key={j}>{child.text}</span>
        ))}
      </p>
    ))}
  </>
);
export default RichTextBlock;