/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
// This is the main component for the groups display page
import { Link } from 'react-router';
import React from 'react';

export default class GroupSidebarComponent extends React.Component {

	constructor(props) {
		super(props);
		this.handleGroupSelect = this.handleGroupSelect.bind(this);
	}

	componentWillMount() {
		this.props.fetchGroupsDetailsIfNeeded();
	}

	handleGroupSelect(e) {
		e.preventDefault();
		const options = e.target.options;
		const selectedGroups = [];
		// We can't map here because this is a collection of DOM elements, not an array.
		for (let i = 0; i < options.length; i++) {
			if (options[i].selected) {
				selectedGroups.push(parseInt(options[i].value));
			}
		}
		console.log(selectedGroups);
		this.props.selectGroups(selectedGroups);
	}

	render() {
		const labelStyle = {
			textDecoration: 'underline'
		};
		return (
			<div>
				<h3>Sidebar</h3>

				<div className="form-group">
					<p style={labelStyle}>Select groups:</p>
					<select multiple className="form-control" id="groupList" size="8" onChange={this.handleGroupSelect}>
						{this.props.groups.map(group =>
							<option key={group.id} value={group.id}>{group.name}</option>
						)}
					</select>
				</div>
			</div>
		);
	}
}
