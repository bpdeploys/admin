import styles from './loading.module.scss';

const Loading = ({ color = '#125b9f' }) => {
  return (
    <div className={styles.ldsRipple}>
      <div style={{ borderColor: color }}></div>
      <div style={{ borderColor: color }}></div>
    </div>
  );
};

export default Loading;
