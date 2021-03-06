﻿// <copyright file="edit-project-dialog-wrapper.tsx" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>

import * as React from "react";
import { Dialog, Text, ParticipantAddIcon, Flex } from "@fluentui/react-northstar";
import * as microsoftTeams from "@microsoft/teams-js";
import JoinProjectContentDialog from "./join-project-dialog-content";
import { IProjectDetails } from "../card-view/discover-wrapper-page";
import { WithTranslation, withTranslation } from "react-i18next";
import { TFunction } from "i18next";
import Resources from "../../constants/resources";

import "../../styles/join-project-dialog.css";

interface IJoinProjectDialogProps extends WithTranslation {
    index: number;
    onSubmit: (projectId: string, isSuccess: boolean) => void;
    cardDetails: IProjectDetails;
    onCancel: () => void;

}

interface IJoinProjectDialogState {
    editDialogOpen: boolean;
    theme: string;
}

class JoinProjectDialog extends React.Component<IJoinProjectDialogProps, IJoinProjectDialogState> {
    localize: TFunction;
    loggedInUserId: string;
    constructor(props: any) {
        super(props);

        this.localize = this.props.t;
        this.loggedInUserId = "";
        this.state = {
            editDialogOpen: false,
            theme: Resources.default
        }
    }

    componentDidMount() {
        microsoftTeams.initialize();
        microsoftTeams.getContext((context: microsoftTeams.Context) => {
            this.loggedInUserId = context.userObjectId!;
        });
    }

	/**
	*Changes dialog open state to show and hide dialog.
	*@param isOpen Boolean indication whether to show dialog
	*/
    changeDialogOpenState = (isOpen: boolean) => {
        this.setState({ editDialogOpen: isOpen })
    }

	/**
    * Renders the component
    */
    public render(): JSX.Element {
        let className = this.state.theme === Resources.dark ? "dark-menu-items-wrapper" : this.state.theme === Resources.contrast ? "contrast-menu-items-wrapper" : "default-menu-items-wrapper";
        return (
            <Dialog
                className="join-project-dialog-container"
                content={
                    <JoinProjectContentDialog
                        projectDetails={this.props.cardDetails}
                        onSubmit={this.props.onSubmit}
                        changeDialogOpenState={this.changeDialogOpenState}
                        loggedInUserId={this.loggedInUserId}
                    />
                }
                open={this.state.editDialogOpen}
                onOpen={() => this.setState({ editDialogOpen: true })}
                trigger={
                    <Flex vAlign="center" className={className} onClick={() => this.changeDialogOpenState(true)}>
                        <ParticipantAddIcon outline /> <Text className="popup-menu-item-text" content={this.localize("addToJoinedProjects")} />
                    </Flex>
                }
                //onClick={(event: any) => this.props.onMenuItemClick(1)} 
            />
        );
    }
}
export default withTranslation()(JoinProjectDialog)