import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'firstLine'
})
export class FirstLinePipe implements PipeTransform {
    transform(value: string): string {
        if (!value) return '';
        const lines = value.split(/\r?\n/); // Handles both \n and \r\n
        return lines[0];
    }
}

//INFO: If you're just displaying text, the pipe is cleaner.
// If you need to manipulate the DOM or apply styles, the directive gives more control.