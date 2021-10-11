import { PdfService } from './../../services/pdf.service';
import { ExportToExcelService } from './../../services/export-to-excel.service';
// import { BnNgIdleService } from 'bn-ng-idle';
import { Router } from '@angular/router';
import { CryptService } from './../../services/crypt.service';
import { ListService } from './../../../../../list.service';
import { ReportService } from './../../services/report.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var $: any;
import * as moment from 'moment';

declare var $: any;
// import '../../../../../assets/timepicker/wickedpicker.js'
import '../../../../../assets/timepicki/js/timepicki.js'
import '../../../../../assets/timepicki/css/timepicki.css'
import * as $ from 'jquery'


declare var jQuery: any;
import * as xlsx from 'xlsx';
import { HistoryService } from 'src/mapservices/history.service';

declare var AddLoader: any;
declare var RemoveLoader: any;

declare var PopupInitialize: any;
declare var mapBuild: any;
declare var SwitchMap: any;
declare var container: any;
declare var content: any;
declare var closer: any;


@Component({
  selector: 'app-rail-routedeviation-report',
  templateUrl: './rail-routedeviation-report.component.html',
  styleUrls: ['./rail-routedeviation-report.component.css']
})
export class RailRoutedeviationReportComponent implements OnInit {
  loginRoleId: string;


  customerList: any[]; divisionList: any[]; subDivisionlist: any[]; sectionList: any[]; groupList: any[]; deviceList: any[];
  customerId: string; divisionIdArr: any[] = []; subdivisionIdArr: any[] = []; sectionIdArr: any[] = []; groupIdArr: any[] = []; deviceIdArr: any[] = [];

  isCustomer: boolean = false; isDivision: boolean = false; isSubDivision: boolean = false; isSection: boolean = false;

  encryptedpageNameValue: any; encryptedpageUrlValue: any;
  pageUrl: any = this.router.url;
  selectDateArray: string[]; fromDate: string; toDate: string; fromTime: any; toTime: any;
  d: Date; submitted: boolean = false;
  pageNumber: any = 1; itemsPerPage: any = 10; filter: any = ''; totalrecord: any = 'NA'; viewcount: any; totalcount: any;

  reportResponseList: any; reportResponseListex: any;

  errorMessage: string;
  excelData: any[];
  geofenceObj: any;
  maploadflag: number = 0;
  historyData: { fromdate: any; fromtime: string; todate: any; totime: string; };
  date: any;
  ValueAlreadyGot: boolean = false; divisionChanged: boolean = false; subdivChanged: boolean = false; sectionChanged: boolean = false;
  inRoute: any;
  outOfRoute: any;
  totalTime: any;
  key: any;
  reverse: boolean=true;



  constructor(private pdfservice: PdfService, private excelservice: ExportToExcelService, private router: Router, private listService: ListService, private cryptService: CryptService, private historyservice: HistoryService, private reportService: ReportService) {
    this.EncryptPageName(); this.EncryptPageUrl();
    this.loginRoleId = sessionStorage.getItem('rid');

    if (this.loginRoleId == '10' || this.loginRoleId == '11'|| this.loginRoleId == '16'|| this.loginRoleId == '21') {
      this.getCustomerList(); this.isCustomer = false;
    }
    else if (this.loginRoleId == "18") { this.isCustomer = true; this.customerId = ''; this.getGroupList(); this.getDivisionList() }

    if (this.loginRoleId == "25") {
      this.customerId = ''; this.isSubDivision = true; this.divisionIdArr = []; this.getDeptList();
    }
    if (this.loginRoleId == "24") {
      this.customerId = ''; this.isDivision = true; this.getSubDivisionList()
    }
    if (this.loginRoleId == "22") {
      this.customerId = ''; this.getGroupList(); this.isSection = true;
    }
  }

  ngOnInit() {

    let prev = { "param1": "s1gW1upi+tiuwpLAGGOCqQ==", "selectvehicleid": ["1923", "1829", "1374", "1368", "1738", "1739", "1740", "1741", "1742", "1745", "1743", "1744", "1746", "1747", "1748", "1749", "1750", "1755", "1751", "1752", "1753", "1756", "1754", "1757", "1758", "1759", "1760", "1761", "1917", "1918", "1919", "1615", "1616", "1617", "1618", "1619", "1620", "1975", "1612", "1614", "1974", "1623", "1624", "1625", "1369", "1366", "1375", "1372", "1365", "1376", "1370", "1364", "1363", "1367", "1373", "1377", "1378", "1379", "1380", "1381", "1382", "1321", "1383", "1371", "1558", "1559", "1560", "1561", "1562", "1563", "1564", "1565", "1566", "1567", "1568", "1569", "1570", "1571", "1572", "1573", "1575", "1577", "1578", "1579", "1580", "1581", "1582", "1583", "1584", "1968", "1920", "1921", "1922", "2033", "1924", "1927", "1969", "1926", "1925", "1928", "1929", "1930", "1931", "1932", "1933", "1934", "1935", "1936", "1937", "1938", "1939", "1940", "1941", "1942", "1944", "1945", "1946", "1947", "1838", "1839", "1840", "1841", "1842", "1843", "1844", "1845", "1846", "1847", "1848", "1849", "1850", "1851", "1880", "1852", "1853", "1854", "1855", "1856", "1857", "1881", "1858", "1859", "1860", "1861", "1875", "1876", "1877", "1878", "1879", "1590", "1588", "1589", "1592", "1593", "1594", "1595", "1596", "1556", "1585", "1586", "1587", "1597", "1598", "1599", "1600", "1601", "1602", "1603", "1604", "1605", "1606", "1607", "1608", "1609", "1610", "1611", "1762", "1763", "1764", "1765", "1766", "1767", "1768", "1769", "1770", "1771", "1772", "1773", "1774", "1775", "1776", "1777", "1778", "1779", "1780", "1781", "1782", "1783", "1784", "1785", "1786", "1787", "1788", "1789", "1791", "1792", "1793", "1626", "1627", "1628", "1629", "1631", "1632", "1633", "1634", "1635", "1636", "1637", "1638", "1639", "1640", "1641", "1642", "1643", "1644", "1645", "1646", "1647", "1648", "1649", "1650", "1651", "1652", "1653", "1654", "1655", "1656", "1680", "1681", "1682", "1683", "1684", "1685", "1686", "1687", "1688", "1689", "1690", "1691", "1692", "1693", "1694", "1695", "1696", "1697", "1698", "1699", "1700", "1701", "1702", "1703", "1704", "1705", "1706", "1707", "1708", "1709", "1710", "1711", "1712", "1713", "1714", "1715", "1716", "1717", "1718", "1719", "1720", "1721", "1722", "1723", "1724", "1725", "1726", "1727", "1728", "1729", "1730", "1731", "1732", "1733", "1734", "1735", "1736", "1737", "1998", "1981", "1999", "2000", "1982", "1983", "1984", "1985", "2004", "1986", "2005", "2006", "1987", "2032", "1988", "1989", "2007", "1990", "1991", "1992", "2001", "1993", "2002", "2003", "1994", "1995", "1996", "1997", "2010", "1531", "1532", "2031", "1533", "1534", "1535", "1536", "1537", "1538", "1539", "1540", "1557", "1541", "1542", "1543", "1544", "1545", "1546", "1547", "1548", "1549", "1550", "1551", "1552", "1553", "1554", "1555", "1818", "1819", "1820", "1821", "1822", "1823", "1824", "1825", "1826", "1827", "1828", "1976", "1621", "1622", "1977", "1830", "1831", "1832", "1833", "1834", "1835", "1836", "1837", "1659", "1660", "1661", "1662", "1663", "1664", "1665", "1666", "1657", "1658", "1667", "1668", "1670", "1671", "1672", "1673", "1674", "1675", "1676", "1677", "1678", "1679", "1980", "1882", "1970", "1971", "1972", "1883", "1884", "1885", "1886", "1887", "1888", "1889", "1890", "1891", "1892", "1893", "1894", "1973", "1869", "1870", "1868", "1863", "1862", "1866", "1871", "1872", "1867", "1865", "1873", "1864", "1794", "1795", "1796", "1797", "1798", "1799", "1800", "1801", "1802", "1803", "1805", "1804", "1978", "1806", "1807", "1979", "1808", "1809", "1810", "1811", "1812", "1814", "1813", "1815", "1816", "1817", "2034", "2035", "2036", "2037", "2038", "2039", "2040", "2041", "2042", "2043", "2044", "2045", "2046", "2047", "2048", "2049", "2050", "2051", "2052", "2053", "2054", "2055", "2056", "2057", "2058", "2059", "2060", "2061", "2017", "2018", "2019", "2020", "2021", "1948", "1949", "1950", "1951", "1952", "1953", "1954", "1955", "1956", "1957", "1958", "1959", "1960", "1961", "1962", "1963", "1964", "1965", "1966", "1967", "2030", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029"], "param3": "2021-06-04", "param4": "00:00", "param5": "2021-07-03", "param6": "23:59", "divisionList": ["IWQ0k7sXfmJRy93SnP1k9w==", "2LmuTjHwcUlIKAghr2VeCA==", "rBIYTxtaCDTH8UQ2HYb6Wg==", "Oea0KmvjwdlwuSgfOK8drA=="], "subDivisionList": ["0n2GwrvYRsrR+RYm3iRVKg==", "Qz2qey9yjSDgT/I38sGGyg==", "zopfPTNq6d/Q0Y0AA3zj9w==", "vb81JN/CLoSNHFMhXppvXA==", "+06V+inNKqDSbryTyqbBoQ==", "FSvr4r5cw77FQqzX3J0qsQ==", "ssqIfE8v66M5624NEDIfdA==", "ApTum/IypXzFp7LHwuel0A=="], "dpartmentList": ["SYQCUtgWEF5n/hZRNhS/cA==", "C/SIxj9cbCk55pO0mLPEiQ==", "21m6Da1SJAXk55WQopCpFQ==", "EClWXRZq4vaNSrVCIyo3Sg==", "uCASqXYyjOg5Tf6F6K/KVA==", "APg5N137SwXtPCMdkdJIwQ==", "BzRbsz5HfolJINrDQWqLoQ==", "vb81JN/CLoSNHFMhXppvXA==", "wB0ThmwQBDjDa8FoBagUSQ==", "IyBFb8ChJfOTaKKrxzQpJQ==", "/t9MmRsA3NmxeIS2sSDOXg==", "Qz2qey9yjSDgT/I38sGGyg==", "gorr0/517AHVQoYV6s2ucA==", "2qQVLXDCF1fJm/oCyg0pRw==", "y312dPD5sZLPomamKFZ81w==", "WVSTiE5vgB7IySR4//+Yjg==", "+KhqlNR6EGQiJYHeM306UA==", "LelWEPl1Mc+vLFkw8zoO+A==", "dTlJXDNWOwDJDqEy7GXiMg==", "cTsxw+A+4ppSr58OWfJO5Q==", "kIFQf7IVMb2z+gvdIeAQ/A==", "0XpmkJe6ffRWUBp6STqfEg==", "PgI+P/MrW4rI22r9vYnC0A=="], "groupList": ["eO2Rusf2On5AHC23JEV99A==", "9QU4JgGGGs0kWDkkfCuM8Q==", "iazE1BVP/aKr4j3kRKjpYw==", "qMcVqjpEu0f2b+LHZwgRSQ==", "so4VMpp/OhTyXC4B4oX33g==", "JWMdlmMdNCOvsryz6IdzaQ==", "j4zo3zS8Wb/XNZhIVMG5LA==", "LGNYknWT1llK2LRK38f8wA==", "dJ2lYyVrs+WXcoBwIKl+AA=="], "pageNo": 1, "itemsPerPage": 10, "searchBy": "", "searchType": "", "totalRecords": "NA", "pageID": "7", "pageName": "XV238nIKH669ka4NQhovVw==:61bb85fc98ae0d0401249667149d2c45fa1f9814bd2891e0e5bc424574f56509:7HUO2JLbvQGlLLHktwa6Dg==", "pageURL": "Z9eqf6h5jJFUfIpsy8niQA==:44b67a939e023a437217f9b8f80fc894203747db49f32c3aa20233e25326cd12:KkJo1OcaeIF5MxRHAX0fRg==" }
    this.reportService.RailRouteDeviationReport(prev).subscribe((response) => {

      this.reportResponseList = response.entity;
      this.inRoute = response.totalroutedevin;
      this.outOfRoute = response.totalroutedevout;
      this.totalTime = response.totaltimeinroutedev;
      this.totalcount = response.count;
      this.viewcount = response.entity.length;

    })
    // timepicker starts
    $('.timepicker').timepicki();
    //timepickr ends

    // datepicker starts
    (function ($) {
      $(document).ready(function () {

        /* calander single  picker ends */
        $('.datepicker').daterangepicker({
          singleDatePicker: true,
          showDropdowns: true,
          minYear: 1901
        }, function (start, end, label) { });

        $('.datepicker').on('show.daterangepicker', function (ev, picker) {
          var thisdp = $('.daterangepicker');
          setTimeout(function () {
            thisdp.addClass('active');
          }, 100);
        });
        $('.datepicker').on('hide.daterangepicker', function (ev, picker) {
          var thisdpc = $('.daterangepicker');
          thisdpc.removeClass('active');

        });
        /* calander single picker ends */

        /* calander picker */
        var start = moment().subtract(29, 'days');
        var end = moment();


        this.initialDate = start;
        this.endDate = end;
        function cb(start, end) {
          $('#daterangeadminux2 span').html(start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
        }

        $('#daterangeadminux2').daterangepicker({
          startDate: start,
          endDate: end,
          opens: 'left',
          maxDate: new Date()
        }, cb);

        // this.initialDate =  $('#daterangeadminux2 span').html(start.format('MMM D, YY')).stringify() ;

        cb(start, end);
        $('#daterangeadminux2').on('show.daterangepicker', function (ev, picker) {
          var thisdp = $('.daterangepicker');
          setTimeout(function () {
            thisdp.addClass('active');
          }, 100);
        });
        var path = 'assets/images/background-part.png';
        $('.daterangepicker').append('<div class="background" style="background-image: url(' + path + '); z-index:-1; height:80px;"><img src="assets/images/background-part.png" alt="" style="display:none"></div>')
      });

    })(jQuery);
    //  datepicker ends
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  EncryptPageName() {
    this.cryptService.encrypt("keyman_patrolman Report")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput
  }

  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl);
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  }

  getCustomerList() {
    let dataL = {
      pageID: "2",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    this.listService.CustomerListAPI(dataL).subscribe((response) => {
      this.customerList = response.entity.list;
    })
  }


  getDivisionList() {
    this.divisionIdArr = []; this.subdivisionIdArr = []; this.sectionIdArr = []; this.groupIdArr = []; this.deviceIdArr = []

    let dataL = {
      param1: this.customerId,
      groupList: [],//groupid[], 
      "pageID": "",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    AddLoader()
    this.listService.divisionlistv1(dataL).subscribe((response) => {
      RemoveLoader()
      this.divisionList = response.entity
    })


  }
  changeDivision() {
    this.subdivisionIdArr = []; this.sectionIdArr = []; this.groupIdArr = []; this.deviceIdArr = []; this.divisionChanged = true
  }
  getSubDivisionList() {
    if (this.divisionChanged == true) {
      let dataL = {
        param1: this.customerId,// custumerid, 
        groupList: [],// this.groupIdArr,// groupid[], 
        divisionList: this.divisionIdArr,// divisionid[],
        "pageID": "rte",
        "pageName": this.encryptedpageNameValue,
        "pageURL": this.encryptedpageUrlValue
      }
      AddLoader()
      this.listService.subdivisionlistv1(dataL).subscribe((response) => {
        RemoveLoader()
        this.subDivisionlist = response.entity
      })
      this.divisionChanged = false;
    }
  }


  changeSubDiv() {
    this.sectionIdArr = [];
    this.groupIdArr = [];
    this.deviceIdArr = [];
    this.subdivChanged = true
  }
  getDeptList() {
    if (this.subdivChanged == true) {
      let dataL = {
        param1: this.customerId,
        groupList: [],// groupid[], 
        divisionList: this.divisionIdArr,// divisionid[],
        subDivisionList: this.subdivisionIdArr,// subdivisionid[],
        "pageID": "",
        "pageName": this.encryptedpageNameValue,
        "pageURL": this.encryptedpageUrlValue
      }
      AddLoader()
      this.listService.departmentlistv1(dataL).subscribe((response) => {
        RemoveLoader();
        this.sectionList = response.entity;
      })
      this.subdivChanged = false
    }
  }

  changeSection() {
    this.groupIdArr = []; this.sectionChanged = true;
  }

  getGroupList() {
    if (this.sectionChanged == true) {

      let dataL = {
        param1: this.customerId,
        "pageID": "wegw",
        "pageName": this.encryptedpageNameValue,
        "pageURL": this.encryptedpageUrlValue
      }
      AddLoader()
      this.listService.grouplist(dataL).subscribe(response => {
        RemoveLoader()
        this.groupList = response.entity;
      })
      this.sectionChanged = false
    }
  }

  setdevicelist() {
    this.deviceIdArr = []
  }
  GetVehicleListAfterCustomer() {
    let dataL = {
      param1: this.customerId,
      groupList: this.groupIdArr,
      divisionList: this.divisionIdArr,
      subDivisionList: this.subdivisionIdArr,
      dpartmentList: this.sectionIdArr,
      "pageID": "",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    AddLoader()
    this.listService.vehicleListv1(dataL).subscribe((response) => {
      RemoveLoader()
      if (response.statuscode == 200) {
        this.deviceList = response.entity;
      }
    })
  }

  onSubmit() {

    const inputElement = document.getElementById('daterange').innerHTML;
    this.selectDateArray = inputElement.split(' to ', 2);
    this.fromDate = this.selectDateArray[0];
    this.toDate = this.selectDateArray[1];


    this.fromTime = $('#fromTime').val();
    this.toTime = $('#toTime').val();

    this.d = new Date();

    if (this.loginRoleId == "10" || this.loginRoleId == "11") {
      if (this.customerId == '' || this.divisionIdArr.length == 0 || this.subdivisionIdArr.length == 0 || this.sectionIdArr.length == 0 || this.groupIdArr.length == 0 || this.deviceIdArr.length == 0) {
        this.submitted = true
      }
      else { this.GetRouteDaviationReport() }
    }
    else if (this.isCustomer == true) {
      this.customerId='';
      if (this.divisionIdArr.length == 0 || this.subdivisionIdArr.length == 0 || this.sectionIdArr.length == 0 || this.groupIdArr.length == 0 || this.deviceIdArr.length == 0) {
        this.submitted = true
      }
      else { this.GetRouteDaviationReport() }
    }

    else if (this.isDivision == true) {
      this.customerId='';
      if (this.subdivisionIdArr.length == 0 || this.sectionIdArr.length == 0 || this.groupIdArr.length == 0 || this.deviceIdArr.length == 0) {
        this.submitted = true
      }
      else { this.GetRouteDaviationReport() }
    }
    else if (this.isSubDivision == true) {
      this.customerId='';
      if (this.sectionIdArr.length == 0 || this.groupIdArr.length == 0 || this.deviceIdArr.length == 0) {
        this.submitted = true
      }
      else { this.GetRouteDaviationReport() }
    } else if (this.isSection == true) {
      this.customerId='';
      if (this.groupIdArr.length == 0 || this.deviceIdArr.length == 0) {
        this.submitted = true
      }
      else { this.GetRouteDaviationReport() }
    }
  }

  GetRouteDaviationReport() {

    if(this.isCustomer ==true){this.customerId=''}
    if (this.ValueAlreadyGot == true) {
      this.totalrecord = this.totalcount;
    }
    else {
      this.totalrecord = "NA"
    }
    let dataL = {
      param1: this.customerId,//"selectcustomerid-->ALL/ID",
      selectvehicleid: this.deviceIdArr,// "selectvehicleid[]",
      param3: this.fromDate,// "fromdate",
      param4: this.fromTime,// "fromtime",
      param5: this.toDate,// "todate",
      param6: this.toTime,// "totime",
      divisionList: this.divisionIdArr,// "divisionid[]",
      subDivisionList: this.subdivisionIdArr,// "subdivisionid[]",
      dpartmentList: this.sectionIdArr,// "departmentid[]",
      groupList: this.groupIdArr,// "groupid[]",
      pageNo: this.pageNumber,
      itemsPerPage: this.itemsPerPage,
      searchBy: this.filter,
      searchType: "",
      totalRecords: this.totalrecord,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    AddLoader()
    this.reportService.RailRouteDeviationReport(dataL).subscribe((response) => {
      RemoveLoader()
      if (response.statuscode == 200) {
        document.getElementById('inputform').style.display = 'none';
        document.getElementById('outputform').style.display = 'block'

        this.reportResponseList = response.entity;
        this.inRoute = response.totalroutedevin;
        this.outOfRoute = response.totalroutedevout;
        this.totalTime = response.totaltimeinroutedev;
        this.totalcount = response.count;
        this.viewcount = response.entity.length;
      }
      else {
        this.errorMessage = response.entity;
        $("#ErrorModal").modal('show')
      }
    })
  }

  exportToExcel() {
    let dataL = {
      param1: this.customerId,//"selectcustomerid-->ALL/ID",
      selectvehicleid: this.deviceIdArr,// "selectvehicleid[]",
      param3: this.fromDate,// "fromdate",
      param4: this.fromTime,// "fromtime",
      param5: this.toDate,// "todate",
      param6: this.toTime,// "totime",
      divisionList: this.divisionIdArr,// "divisionid[]",
      subDivisionList: this.subdivisionIdArr,// "subdivisionid[]",
      dpartmentList: this.sectionIdArr,// "departmentid[]",
      groupList: this.groupIdArr,// "groupid[]",
      pageNo: "",
      itemsPerPage: "",
      searchBy: this.filter,
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    AddLoader()
    this.reportService.RailRouteDeviationReport(dataL).subscribe((response) => {
      RemoveLoader();
      if (response.statuscode == 200) {
        this.reportResponseListex = response.entity;
        this.PrepareExcelData(this.reportResponseListex)
      }
      else {
        this.errorMessage = response.entity;
        $("#ErrorModal").modal('show')
      }
    })
  }

  PrepareExcelData(data) {
    this.excelData = [];
    for (var i = 0; i < data.length; i++) {
      var obj = {
        "#": data[i].rowNumber,
        "VEHICLE NUMBER": data[i].param3,
        "VEHICLE CLASS": data[i].param13,
        "IN DATE TIME": data[i].param6 + " " + data[i].param7,
        "OUT DATE TIME": data[i].param6,
        "DURATION": data[i].param11,
        "ROUTE NAME": data[i].param19,
      }
      this.excelData.push(obj);
    }
    this.excelservice.ExportExcel(this.excelData, 'Route Deviation Report', 'routedeviationreport');

  }



  changePage(event) {
    this.pageNumber = event;
    this.GetRouteDaviationReport();
  }
  changeItemsPerPage() {
    this.pageNumber = 1;
    this.GetRouteDaviationReport();
  }

  searchdata() {
    this.ValueAlreadyGot = false;
    this.pageNumber = 1;
    this.GetRouteDaviationReport();
  }

  Refreshfunction() {
    this.ValueAlreadyGot = false;
    this.pageNumber = 1;
    this.itemsPerPage = 10; this.filter = ''
    this.GetRouteDaviationReport();
  }
 

  gotoBack() {
    // this.customerObj = null; this.deviceObjArr = [];
    (document.getElementById('fromTime') as HTMLInputElement).value = "00:00";
    (document.getElementById('toTime') as HTMLInputElement).value = "23:59";

    this.customerId = null; this.divisionIdArr = []; this.subdivisionIdArr = []; this.sectionIdArr = [];
    this.groupIdArr = []; this.deviceIdArr = [];this.deviceIdArr=[]


    document.getElementById("inputform").style.display = "block";
    document.getElementById("outputform").style.display = "none";

    this.ngOnInit();
  }


  RouteDeviationReportPDFDownload() {
    let dataL = {
      param1: this.customerId,//"selectcustomerid-->ALL/ID",
      selectvehicleid: this.deviceIdArr,// "selectvehicleid[]",
      param3: this.fromDate,// "fromdate",
      param4: this.fromTime,// "fromtime",
      param5: this.toDate,// "todate",
      param6: this.toTime,// "totime",
      divisionList: this.divisionIdArr,// "divisionid[]",
      subDivisionList: this.subdivisionIdArr,// "subdivisionid[]",
      dpartmentList: this.sectionIdArr,// "departmentid[]",
      groupList: this.groupIdArr,// "groupid[]",
      pageNo: "",
      itemsPerPage: "",
      searchBy: this.filter,
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    AddLoader()
    this.reportService.RailRouteDeviationReport(dataL).subscribe((response) => {
      RemoveLoader()
      if (response.statuscode == 200) {
        this.reportResponseListex = response.entity;
        var pdfTableData;
        var dataArray = []
        for (let i = 0; i < this.reportResponseListex.length; i++) {
          pdfTableData = {
            "#": this.reportResponseListex[i]["rowNumber"],
            "Device No.": this.reportResponseListex[i]["param3"],
            "Vehicle Class": this.reportResponseListex[i]["param21"],
            "In Date Time": this.reportResponseListex[i]["param7"],
            "Out Date Time": this.reportResponseListex[i]["param9"],
            "Duration": this.reportResponseListex[i]["param12"],
            "Route Name": this.reportResponseListex[i]["param19"],
          }
          dataArray.push(pdfTableData)
        };
        this.pdfservice.CreatePDFData(dataArray, "Railway Route Deviation Report");
      }
      else {
        this.errorMessage = response.entity;
        $("#ErrorModal").modal('show')
      }
    })

  }

  Openmap(data) {
    let data1 = data.param7;
    let fromDateTimeArray = [];
    fromDateTimeArray = data1.split(' ');
    let fromDate = fromDateTimeArray[0]; let fromTime = fromDateTimeArray[1]
    let data2 = data.param9;
    let toDateTimeArray = [];
    toDateTimeArray = data2.split(' ');
    let toDate = toDateTimeArray[0]; let toTime = toDateTimeArray[1]

    document.getElementById("map").style.height = screen.height - 220 + "px"
    $('#maptrack').modal('show');

    if (this.maploadflag == 0) {

      //==============map functionality

      //===== BuildMap
      let center = [79.0882, 21.1458]
      try { new mapBuild('map', center) } catch (e) { }
      try {
        container = document.getElementById("popup");
        content = document.getElementById("popup-content");
        closer = document.getElementById("popup-closer");

        PopupInitialize();
      } catch (e) { }
      try { SwitchMap("3") } catch (e) { alert("come" + e) }
      this.maploadflag = 1;


      this.historyData = {

        fromdate: fromDate,
        fromtime: fromTime,
        todate: toDate,
        totime: toTime,
      }

      //call History Funciton

      //=========== mapfunctionality end
    }

    var staticdetails = {

      "pageID": "1",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }



    // this.historyservice.HistoryPlot(data.param2, data.param3, this.historyData.fromdate, this.historyData.fromtime, this.historyData.todate, this.historyData.totime, '0', '0', '5', staticdetails);
  //  this.historyservice.HistoryPlot("vehicleid", vrehicle no., fromDate, fromTime, toDate, toTime, route condition[0/1],poi condition[0/1], mapx speed condition/stop condition/idle condition5, staticdetails)
    this.historyservice.HistoryPlot(data.param2, data.param3, fromDate, fromTime, toDate, toTime, 1, 1, 5, staticdetails)

  }

  preswitchid = "3"
  MapSwitch(layerindex) {
    try {
      if (this.preswitchid != "") {
        $("#switch" + this.preswitchid).removeClass("activeSwitchOption effect8");
      }
      this.preswitchid = layerindex;
    } catch (e) { }
    $("#switch" + layerindex).addClass("activeSwitchOption effect8");

    try { SwitchMap(layerindex) } catch (e) { }
  }



  OpenCollapse() {
    $("#mapswitcher").collapse('show');

  }

  CloseCollapse() {
    $("#mapswitcher").collapse('hide');
  }


}
