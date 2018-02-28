/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import axios, {AxiosResponse} from 'axios';
import {BarReadings, LineReadings} from '../types/readings';
import { TimeInterval } from '../../../common/TimeInterval';
import * as moment from 'moment';
import {NamedIDItem} from '../types/items';

/**
 * Provides access to the backend.
 */
class Api {

	public async metersDetails(): Promise<NamedIDItem[]> {
		return (await this.doGetRequest<NamedIDItem[]>('/api/meters'));
	}

	public async meterLineReadings(meterIDs: number[], timeInterval: TimeInterval): Promise<LineReadings> {
		const stringifiedIDs = meterIDs.join(',');
		return await this.doGetRequest<LineReadings>(
			`/api/readings/line/meters/${stringifiedIDs}`,
			{ timeInterval: timeInterval.toString() }
			);
	}

	public async groupLineReadings(groupIDs: number[], timeInterval: TimeInterval): Promise<LineReadings> {
		const stringifiedIDs = groupIDs.join(',');
		return await this.doGetRequest<LineReadings>(
			`/api/readings/line/groups/${stringifiedIDs}`,
			{ timeInterval: timeInterval.toString() }
		);
	}

	public async meterBarReadings(meterIDs: number[], timeInterval: TimeInterval, barDuration: moment.Duration): Promise<BarReadings> {
		const stringifiedIDs = meterIDs.join(',');
		return await this.doGetRequest<BarReadings>(
			`/api/readings/bar/meters/${stringifiedIDs}`,
			{ timeInterval: timeInterval.toString(), barDuration: barDuration.toISOString() }
		);
	}

	public async groupBarReadings(groupIDs: number[], timeInterval: TimeInterval, barDuration: moment.Duration): Promise<BarReadings> {
		const stringifiedIDs = groupIDs.join(',');
		return await this.doGetRequest<BarReadings>(
			`/api/readings/bar/groups/${stringifiedIDs}`,
			{ timeInterval: timeInterval.toString(), barDuration: barDuration.toISOString() }
		);
	}

	private async doGetRequest<R>(
		url: string,
		params: { [key: string]: string } = {},
		headers: { [key: string]: string } = {}
	): Promise<R> {
		const response: AxiosResponse = await axios.get(url, { params, headers });
		return response.data as R;
	}

	private async doPostRequest<R>(
		url: string,
		body: any,
		params: { [key: string]: string } = {},
		headers: { [key: string]: string } = {}
	): Promise<R> {
		const response: AxiosResponse = await axios.post(url, body, { params, headers });
		return response.data as R;
	}
}

export default new Api();
