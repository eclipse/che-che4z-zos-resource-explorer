/*
 * Copyright (c) 2019 Broadcom.
 * The term "Broadcom" refers to Broadcom Inc. and/or its subsidiaries.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Contributors:
 *   Broadcom, Inc. - initial API and implementation
 */

export class ZoweRestClient {
    constructor(private creds: any) {
    }
    public async listMembers(host, datasetName): Promise<any> {
        return ["M1", "M2", "M3"];
    }
<<<<<<< HEAD
=======

    public async putContent(host: Connection, content: string, dataSetName: string, member: string): Promise<string> {
        // const target: string = member ? `${dataSetName}(${member})` : dataSetName;
        // const url = this.urlPrefix(host) + encodeURIComponent(target) + "/content";
        return "SUCCESS!";
    }

    public async getContent(host: Connection, dataSetName: string): Promise<string> {
        // const url = this.urlPrefix(host) + encodeURIComponent(dataSetName) + "/content";
        return "TEST";
    }
>>>>>>> 821e067... WIP added can paste unit test
}
