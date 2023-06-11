import styles from "./Backdrop.module.css";
const Backdrop = (props: {
  hideBackdrop: () => void;
  children: React.ReactNode;
}) => {
  return (
    <div onClick={props.hideBackdrop} className={styles.main}>
      <div className={styles.child} onClick={(e) => e.stopPropagation()}>
        {props.children}
      </div>
    </div>
  );
};

export default Backdrop;
