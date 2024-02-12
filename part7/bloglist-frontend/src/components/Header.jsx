import React from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../features/authSlice';

const Header = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.auth);

	const padding = {
		padding: 5,
	};

	const style = {
		padding: 5,
	};

	const handleLogout = async (event) => {
		event.preventDefault();
		dispatch(logout());
		navigate.push('/');
	};

	return (
		<Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
			<Navbar.Toggle aria-controls='responsive-navbar-nav' />
			<Navbar.Collapse id='responsive-navbar-nav'>
				<Nav className='mr-auto'>
					<Nav.Link href='#' as='span'>
						<Link style={padding} to='/blogs'>
							blogs
						</Link>
					</Nav.Link>
					<Nav.Link href='#' as='span'>
						<Link style={padding} to='/users'>
							users
						</Link>
					</Nav.Link>
					<span style={style}>{user.name} logged in </span>
					<Button variant='danger' onClick={handleLogout} type='submit'>
						logout
					</Button>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default Header;
