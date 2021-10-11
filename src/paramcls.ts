export class Paramcls {
    param1: string; param2: string; param3: string; param4: string; param5: string; param6: string; param7: string;
    param8: string; param9: string; param10: string; param11: string; param12: string; param13: string; param14: string;
    param15: string; param16: string; param17: string; param18: string; param19: string; param20: string;
    param21: string; param22: string; param23: string; param24: string; param25: string; param26: string;
    param27: string; param28: string; param29: string; param30: string; param31: string; param32: string;
    param33: string; param34: string; param35: string; param36: string; param37: string; param38: string; param39: string;
    param40: string; param41: string; param42: string; param43: string; param44: string; param45: string; param46: string;
    param47: string; param48: string; param50: string; param51: string; param52: string; param53: string; param54: string;
    param55: string; param56: string; param57: string; param58: string; param59: string; param60: string; param61: string;
    param62: string; param63: string; param64: string; param65: string; param66: string; param67: string; param68: string;
    param69: string; param70: string; param71: string; param72: string; param73: string; param74: string; param75: string;
    param76: string; param77: string; param78: string; param79: string; param80: string;

    totalbatteryhigh: string; totalbatterylow: string; totalbatterymedium: string; totalbatterynopower: string;
    totalcount: string; totaldistance: string; totalmaintainancecount: string; totalnonworkingcount: string;
    totalworkingcount: string; divisionid: string; divisionmaintainancecount: string; divisionname: string;
    divisiontotalbatteryhigh: string; divisiontotalbatterylow: string; divisiontotalbatterymedium: string;
    divisiontotalbatterynopower: string; divisiontotalcount: string; divisiontotaldistance: string;
    divisiontotalnonworkingcount: string; divisiontotalworkingcount: string; responsesubdivisiondata: string;
    subdivisionid: string; subdivisionmaintainancecount: string; subdivisionname: string;
    subdivisiontotalbatteryhigh: string; subdivisiontotalbatterylow: string; subdivisiontotalbatterymedium: string;
    subdivisiontotalbatterynopower: string; subdivisiontotalcount: string; subdivisiontotaldistance: string;
    subdivisiontotalnonworkingcount: string; subdivisiontotalworkingcount: string;

    pageID: string; pageName: string; pageURL: string;
}
export class crossOrigin {
    public geturl() {
        const url = 'https://track.indtrack.com/vtsindtrackapiv1/';
        // const url = 'https://api.indtrack.co.in/vtsindtrackapiv1/'
        return url;
    }

    
    public getnewurl() {
        const url = 'https://track.indtrack.com/vtsindtrackapiv2/';
        // const url = 'https://api.indtrack.co.in/vtsindtrackapiv1/'
        return url;
    }

    public getadminurl() {
        const urladmin = 'https://track.indtrack.com/vtsindtrackapiv1/';
        return urladmin;
    }
}
