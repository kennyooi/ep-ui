import React, { Component } from 'react';
import projectPackage from '../../package.json';
import { GhostButton } from '../../src/index';
import './LandingPage.less';


export default class LandingPage extends Component {

    render() {
        return (
            <div className="LandingPage">
                <header className="LandingPage-hero">
                    <div className="container">
                        <h1>EP React UI</h1>
                        <h4>Documentation for React UI Components in EP.</h4>
                        <div className="m-t-30 m-b-5">
                            <GhostButton
                                TagName="a"
                                theme="white"
                                size="lg"
                                href={projectPackage.repository.url}
                            >Github Page</GhostButton>
                        </div>
                        <div className="LandingPage-hero-ver">version {projectPackage.version}</div>

                    </div>
                </header>
            </div>
        );
    }
}