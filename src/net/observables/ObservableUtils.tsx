/*
 * Copyright (c) 2022.  Botts Innovative Research, Inc.
 * All Rights Reserved
 *
 * opensensorhub/osh-viewer is licensed under the
 *
 * Mozilla Public License 2.0
 * Permissions of this weak copyleft license are conditioned on making available source code of licensed
 * files and modifications of those files under the same license (or in certain cases, one of the GNU licenses).
 * Copyright and license notices must be preserved. Contributors provide an express grant of patent rights.
 * However, a larger work using the licensed work may be distributed under different terms and without
 * source code for files added in the larger work.
 *
 */

import {IObservable, IPhysicalSystem, SensorHubServer} from "../../data/Models";
import {getObservablePointMarkers} from "./PliObservables";
import {getObservableVideoStreams} from "./VideoStreamObservables";
import {getObservableRegionsOfInterest} from "./RoiObservables";
import {getObservableImages} from "./ImageObservables";
import {getObservableEllipses} from "./EllipsesObservables";
import {getObservableLinesOBearing} from "./LobObservables";
import {getObservableCharts} from "./ChartObservables";
import {getObservableDrapedImagery} from "./DrapedImageryObservable";

export async function getObservables(server: SensorHubServer, withCredentials: boolean): Promise<IObservable[]> {

    let observables: IObservable[] = [];

    observables.push(...await getObservableDrapedImagery(server, withCredentials).then(observables => {
        return observables
    }));

    observables.push(...await getObservablePointMarkers(server, withCredentials).then(observables => {
        return observables
    }));

    observables.push(...await getObservableRegionsOfInterest(server, withCredentials).then(observables => {
        return observables
    }));

    observables.push(...await getObservableVideoStreams(server, withCredentials).then(observables => {
        return observables
    }));

    observables.push(...await getObservableImages(server, withCredentials).then(observables => {
        return observables
    }));

    observables.push(...await getObservableEllipses(server, withCredentials).then(observables => {
        return observables
    }));

    observables.push(...await getObservableLinesOBearing(server, withCredentials).then(observables => {
        return observables
    }));

    observables.push(...await getObservableCharts(server, withCredentials).then(observables => {
        return observables
    }));

    return observables;
}

/**
 * Finds a path to a given by a specific term within the paths returned from discovery
 * @param paths The set of paths received with the discovery data
 * @param term The term or terms to attempt to match
 *
 * @return value String representing the found path
 */
export function findPath(paths: any, term: string): string {

    let value: string = null;

    let targets: string[] = term.split("|");

    for (let targetIdx = 0; value === null && targetIdx < targets.length; ++targetIdx) {

        let target: string = targets[targetIdx].trim();

        for (let pathInfo of paths) {

            if (pathInfo.name === target) {

                value = pathInfo.path;
                break;
            }
        }
    }

    return value;
}

/**
 * Finds a physical system, if any, belonging to the give server with the given id
 * @param server The server to lookup the physical system in
 * @param systemId The id of the physical system being searched for
 *
 * @return null if no physical system is found, otherwise the physical system object
 */
export function getPhysicalSystem(server: SensorHubServer, systemId: string): IPhysicalSystem {

    let physicalSystem: IPhysicalSystem = null;

    for (let system of server.systems) {

        if (system.systemId === systemId) {

            physicalSystem = system;
            break;
        }
    }

    return physicalSystem;
}