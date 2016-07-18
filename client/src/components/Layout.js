import React from "react"
import { Link, hashHistory } from 'react-router'


export default function Layout({ children }) {
	 return (
		<div>
			<header>
				<Link to="/">Home </Link>
				<Link to="/messages">Messages </Link>
				<Link to="/login">Login</Link>
			</header>
	  	<div>
		<button onClick={() => hashHistory.push('/login')}>Login</button>
	  </div>
	  <div >{children}</div>
	</div>
	)
}