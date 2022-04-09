import React, { useState, useEffect } from "react";

const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [taskArray, setTaskArray] = useState([]);
	useEffect(() => {
		getData();
	}, []);

	const getData = () => {
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/josemiguelhseptien"
		)
			.then((response) => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				// Read the response as json.
				return response.json();
			})
			.then((responseAsJson) => {
				// Do stuff with the JSONified response
				setTaskArray(responseAsJson);
			})
			.catch((error) => {
				console.log("Looks like there was a problem: \n", error);
			});
	};

	const saveTask = (e) => {
		if (e.key === "Enter") {
			//setTaskArray([...taskArray, { label: inputValue, done: false }]);
			fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/josemiguelhseptien",
				{
					method: "PUT", // or 'POST'
					body: JSON.stringify([
						...taskArray,
						{ label: inputValue, done: false },
					]), // data can be a `string` or  an {object} which comes from somewhere further above in our application
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
				.then((res) => {
					if (!res.ok) throw Error(res.statusText);
					return res.json();
				})
				.then((response) => {
					console.log("Success:", response);
					getData();
				})
				.catch((error) => console.error(error));
			setInputValue("");
		}
	};

	let mappedTaskArray = taskArray.map((task, index) => {
		return (
			<li
				className="list-group-item d-flex justify-content-between"
				key={index}>
				{task.label}
				<button
					type="button"
					className="btn btn-outline-light"
					onClick={() => removeTask(index)}>
					<strong>X</strong>
				</button>
			</li>
		);
	});

	function removeTask(i) {
		//setTaskArray([...taskArray, { label: inputValue, done: false }]);
		let filteredArray = taskArray.filter((task, index) => {
			return i != index;
		});
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/josemiguelhseptien",
			{
				method: "PUT", // or 'POST'
				body: JSON.stringify(filteredArray), // data can be a `string` or  an {object} which comes from somewhere further above in our application
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
			.then((res) => {
				if (!res.ok) throw Error(res.statusText);
				return res.json();
			})
			.then((response) => console.log("Success:", response))
			.catch((error) => console.error(error));
		setTaskArray(filteredArray);
	}
	function clearTaskArray() {
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/josemiguelhseptien",
			{
				method: "PUT", // or 'POST'
				body: JSON.stringify([""]), // data can be a `string` or  an {object} which comes from somewhere further above in our application
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
			.then((res) => {
				if (!res.ok) throw Error(res.statusText);
				return res.json();
			})
			.then((response) => console.log("Success:", response))
			.catch((error) => console.error(error));
		setTaskArray([]);
	}
	return (
		<div className="container">
			<div className="mainBox">
				<div className="inputDiv">
					<input
						className="form-control"
						id="newTask"
						value={inputValue}
						onChange={(e) => {
							setInputValue(e.target.value);
						}}
						onKeyUp={(e) => {
							saveTask(e);
						}}
						placeholder="blank"
					/>
					<ul className="list-group">{mappedTaskArray}</ul>
					<div className="clearAll">
						<button
							type="button"
							className="btn btn-outline-secondary"
							onClick={(e) => {
								clearTaskArray();
							}}>
							Clear all
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
