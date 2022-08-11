import styles from "./Card.module.scss";

const Card = (props) => {
	return (
		<div className={`${styles["card"]} ${styles[props.position]}`}>
			{props.children}
		</div>
	);
};

export default Card;
