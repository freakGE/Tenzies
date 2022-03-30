import React from "react";

export default function Die(props) {
	let styles = {
		backgroundColor: props.isHeld ? "#1fada6" : "#6f2a50",
		transition: "all .5s ease",
		boxShadow: props.isHeld
			? "0px 0px 12px 2px hsla(177, 71%, 46%, 0.384)"
			: "0px 0px 12px -2px hsla(177, 71%, 46%, 0.384)",
	};
	return (
		<div onClick={props.holdDice} className="die-item" style={styles}>
			<h2 className="die-number">{props.value}</h2>
		</div>
	);
}
