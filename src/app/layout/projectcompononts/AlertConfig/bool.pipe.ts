import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'bool'
})

export class BoolPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
       
        if(value.length >15 ){
            return value.substr(0,15) + "..."
        }
        else {
            return value
        }
    }
}