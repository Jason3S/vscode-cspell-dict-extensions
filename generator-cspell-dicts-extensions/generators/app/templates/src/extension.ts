'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
interface CodeSpellCheckerExtension {
    registerConfig(path: string): Promise<void>;
    enableLocal(isGlobal: boolean, local: string): Promise<void>;
    disableLocal(isGlobal: boolean, local: string): Promise<void>;
}

<% if (addCommands) { %>
const local = '<%= local %>';
<% } %>

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(<% if (addCommands) { %>context: vscode.ExtensionContext<% } %>) {

    const vscodeSpellCheckerExtension = 'streetsidesoftware.code-spell-checker';
    const configLocation = context.asAbsolutePath('./cspell-ext.json');

    const extension = vscode.extensions.getExtension<CodeSpellCheckerExtension>(vscodeSpellCheckerExtension);

    if (extension) {
        extension.activate().then(ext => {
            // We need to register the dictionary configuration with the Code Spell Checker Extension
            ext?.registerConfig?.(configLocation);
        });
    }

    <% if (addCommands) { %>
    function enable<%= commandName %>(isGlobal: boolean) {
        extension && extension.activate().then(ext => {
            ext?.enableLocal?.(isGlobal, local);
        });
    }

    function disable<%= commandName %>(isGlobal: boolean) {
        extension && extension.activate().then(ext => {
            ext?.disableLocal?.(isGlobal, local);
        });
    }

    // Push the disposable to the context's subscriptions so that the
    // client can be deactivated on extension deactivation
    context.subscriptions.push(
        vscode.commands.registerCommand('cSpellExt_<%= name %>.enable<%= commandName %>', () => enable<%= commandName %>(true)),
        vscode.commands.registerCommand('cSpellExt_<%= name %>.disable<%= commandName %>', () => disable<%= commandName %>(true)),
        vscode.commands.registerCommand('cSpellExt_<%= name %>.enable<%= commandName %>Workspace', () => enable<%= commandName %>(false)),
        vscode.commands.registerCommand('cSpellExt_<%= name %>.disable<%= commandName %>Workspace', () => disable<%= commandName %>(false)),
    );
    <% } %>
}

// this method is called when your extension is deactivated
export function deactivate() {
}
