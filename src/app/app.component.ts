import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    input: string;
    isProcessing: boolean;
    consoleOutput: ConsoleOutput;
    
    constructor(private http: HttpClient) {
        this.consoleOutput = {
            success: null,
            output: null
        }
     }

    onSubmit() {
        if (this.input.length === 0) {
            return;
        }
        this.isProcessing = true;
        this.http.post<ConsoleOutput>('http://localhost:8000/online-cmd', {query: this.input}).subscribe(
            response => {
                this.isProcessing = false;
                this.onCmdResponse(response);
            },
            error => {
                this.isProcessing = false;
                if (error.status === 400) {
                    this.consoleOutput = {
                        success: false,
                        output: error.error.message
                    }
                } else {
                    this.consoleOutput = {
                        success: false,
                        output: "Unfortunate Error *_*"
                    }
                }
                
            }
        )
    }

    onCmdResponse(response): void {
        this.consoleOutput = response;
    }
}

interface ConsoleOutput {
    success: boolean,
    output: string
}