import styles from "./grid.module.css";

export function Grid({ children }: { children: React.ReactNode }) {
  return <div className={styles.gridContainer}>{children}</div>;
}
