import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ContainerComponent, SidebarBrandComponent, SidebarComponent, SidebarFooterComponent, SidebarHeaderComponent, SidebarNavComponent, SidebarToggleDirective } from '@coreui/angular';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexGrid, ApexLegend, ApexMarkers, ApexPlotOptions, ApexResponsive, ApexStroke, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';
import { MatTableModule } from '@angular/material/table';
import { Leads } from '../leads/leads';
import { LeadsService } from '../leads/leads.service';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
import { Customer } from '../customer/customer';
import { CustomerService } from '../customer/customer.service';
import { AuthService } from 'src/app/user/service/auth.service';
interface month {
  value: string;
  viewValue: string;
}

export interface salesOverviewChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid;
  marker: ApexMarkers;
}

export interface yearlyChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  responsive: ApexResponsive;
}

export interface monthlyChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  responsive: ApexResponsive;
}

interface stats {
  id: number;
  time: string;
  color: string;
  title?: string;
  subtext?: string;
  link?: string;
}

export interface productsData {
  id: number;
  imagePath: string;
  uname: string;
  position: string;
  productName: string;
  budget: number;
  priority: string;
}

interface productcards {
  id: number;
  imgSrc: string;
  title: string;
  price: string;
  rprice: string;
}

const ELEMENT_DATA: productsData[] = [
  {
    id: 1,
    imagePath: 'assets/images/profile/user-1.jpg',
    uname: 'Sunil Joshi',
    position: 'Web Designer',
    productName: 'Elite Admin',
    budget: 3.9,
    priority: 'low',
  },
  {
    id: 2,
    imagePath: 'assets/images/profile/user-2.jpg',
    uname: 'Andrew McDownland',
    position: 'Project Manager',
    productName: 'Real Homes Theme',
    budget: 24.5,
    priority: 'medium',
  },
  {
    id: 3,
    imagePath: 'assets/images/profile/user-3.jpg',
    uname: 'Christopher Jamil',
    position: 'Project Manager',
    productName: 'MedicalPro Theme',
    budget: 12.8,
    priority: 'high',
  },
  {
    id: 4,
    imagePath: 'assets/images/profile/user-4.jpg',
    uname: 'Nirav Joshi',
    position: 'Frontend Engineer',
    productName: 'Hosting Press HTML',
    budget: 2.4,
    priority: 'critical',
  },
];
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  items: Leads[] = [];
  itemCustomer: Customer[] = [];
  monthEarning: number;
  yearEarning: number
  totalMonthEarning: number = 0;
  totalYearEarning: number = 0;
  monthEarningItems: number[] = []
  yearEarningItems: number[] = []

  private destroy$: Subject<void> = new Subject<void>();

  pageType!: string;
  @ViewChild('chart') chart: ChartComponent = Object.create(null);

  public salesOverviewChart!: Partial<salesOverviewChart> | any;
  public salesOverviewChart2!: Partial<salesOverviewChart> | any;
  public yearlyChart!: Partial<yearlyChart> | any;
  public monthlyChart!: Partial<monthlyChart> | any;
  public monthlyChart2!: Partial<monthlyChart> | any;

  displayedColumns: string[] = ['assigned', 'name', 'priority', 'budget'];
  dataSource = ELEMENT_DATA;


  months: month[] = [
    { value: 'mar', viewValue: 'March 2023' },
    { value: 'apr', viewValue: 'April 2023' },
    { value: 'june', viewValue: 'June 2023' },
  ];


  stats: stats[] = [
    {
      id: 1,
      time: '09.30 am',
      color: 'primary',
      subtext: 'Payment received from John Doe of $385.90',
    },
    {
      id: 2,
      time: '10.30 am',
      color: 'accent',
      title: 'New sale recorded',
      link: '#ML-3467',
    },
    {
      id: 3,
      time: '12.30 pm',
      color: 'success',
      subtext: 'Payment was made of $64.95 to Michael',
    },
    {
      id: 4,
      time: '12.30 pm',
      color: 'warning',
      title: 'New sale recorded',
      link: '#ML-3467',
    },
    {
      id: 5,
      time: '12.30 pm',
      color: 'error',
      title: 'New arrival recorded',
      link: '#ML-3467',
    },
    {
      id: 6,
      time: '12.30 pm',
      color: 'success',
      subtext: 'Payment Done',
    },
  ];


  productcards: productcards[] = [
    {
      id: 1,
      imgSrc: '/assets/images/products/s4.jpg',
      title: 'Boat Headphone',
      price: '285',
      rprice: '375',
    },
    {
      id: 2,
      imgSrc: '/assets/images/products/s5.jpg',
      title: 'MacBook Air Pro',
      price: '285',
      rprice: '375',
    },
    {
      id: 3,
      imgSrc: '/assets/images/products/s7.jpg',
      title: 'Red Valvet Dress',
      price: '285',
      rprice: '375',
    },
    {
      id: 4,
      imgSrc: '/assets/images/products/s11.jpg',
      title: 'Cute Soft Teddybear',
      price: '285',
      rprice: '375',
    },
  ];

  constructor(private route: ActivatedRoute, private leadsService: LeadsService, private Customerervice: CustomerService, private authService: AuthService, private router: Router) {
    this.monthEarning = new Date().getMonth();
    this.yearEarning = new Date().getFullYear()
    this.pageType = this.route.snapshot.data['pageType'] || '';
  
    this.salesOverviewChart = {
      series: [
      ],

      grid: {
        borderColor: 'rgba(0,0,0,0.1)',
        strokeDashArray: 3,
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      plotOptions: {
        bar: { horizontal: false, columnWidth: '35%', borderRadius: [4] },
      },
      chart: {
        type: 'bar',
        height: 390,
        offsetX: -15,
        toolbar: { show: true },
        foreColor: '#adb0bb',
        fontFamily: 'inherit',
        sparkline: { enabled: false },
      },
      dataLabels: { enabled: false },
      markers: { size: 0 },
      legend: { show: false },
      xaxis: {
        type: 'category',
        categories: [],
        labels: {
          style: { cssClass: 'grey--text lighten-2--text fill-color' },
        },
      },
      yaxis: {
        show: true,
        labels: {
          style: {
            cssClass: 'grey--text lighten-2--text fill-color',
          },
        },
      },
      stroke: {
        show: true,
        width: 3,
        lineCap: 'butt',
        colors: ['transparent'],
      },
      tooltip: { theme: 'light' },

      responsive: [
        {
          breakpoint: 600,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 3,
              },
            },
          },
        },
      ],
    };

    this.salesOverviewChart2 = {
      series: [
      ],

      grid: {
        borderColor: 'rgba(0,0,0,0.1)',
        strokeDashArray: 3,
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      plotOptions: {
        bar: { horizontal: false, columnWidth: '35%', borderRadius: [4] },
      },
      chart: {
        type: 'bar',
        height: 390,
        offsetX: -15,
        toolbar: { show: true },
        foreColor: '#adb0bb',
        fontFamily: 'inherit',
        sparkline: { enabled: false },
      },
      dataLabels: { enabled: false },
      markers: { size: 0 },
      legend: { show: false },
      xaxis: {
        type: 'category',
        categories: [],
        labels: {
          style: { cssClass: 'grey--text lighten-2--text fill-color' },
        },
      },
      yaxis: {
        show: true,
        labels: {
          style: {
            cssClass: 'grey--text lighten-2--text fill-color',
          },
        },
      },
      stroke: {
        show: true,
        width: 3,
        lineCap: 'butt',
        colors: ['transparent'],
      },
      tooltip: { theme: 'light' },

      responsive: [
        {
          breakpoint: 600,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 3,
              },
            },
          },
        },
      ],
    };

  
    this.yearlyChart = {
      series: [],

      chart: {
        type: 'donut',
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        foreColor: '#adb0bb',
        toolbar: {
          show: false,
        },
        height: 130,
      },
      colors: ['#5D87FF', '#ECF2FF'],
      plotOptions: {
        pie: {
          startAngle: 0,
          endAngle: 360,
          donut: {
            size: '75%',
            background: 'transparent',
          },
        },
      },
      stroke: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 991,
          options: {
            chart: {
              width: 120,
            },
          },
        },
      ],
      tooltip: {
        enabled: false,
      },
    };

  }

  ngOnInit(): void {
    if(sessionStorage.getItem('admin-token') === null){
      this.router.navigate([`/admin/${this.pageType}/login`]);
    }
    this.getLeads();
    this.getCustomer()
  }

  getLeads() {
    this.leadsService.getAllItems().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        console.log(data);
        if (data.status === "success") {
          this.items = data.data;
        }
        this.salesOverviewChart.series.push({
          name: 'Lead Value',
          data: this.items.slice(0, 15).map((item) => item.leadValue).reverse(),
          color: '#5D87FF',
        });
        const firstFourItems = data.data.slice(0, 15);
        firstFourItems.forEach((item: any) => {
          const slicedDate = item.createdAt.slice(0, 10);
          this.salesOverviewChart.xaxis.categories.unshift(slicedDate);
        });

        this.yearlyChart.series.push(this.items.length)
      },
      (error) => {
        console.log(error);
        const Toast = Swal.mixin({
          position: 'center',
          showConfirmButton: true,
          timer: 2000,
          timerProgressBar: true,
        });

        Toast.fire({ icon: "error", title: "Lead has been loaded unsuccessfully." });
      }
    );
  }

  getCustomer() {
    this.Customerervice.getAllItems().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        this.monthlyChart = {
          series: [{
            name: 'Customer Value',
            color: '#49BEFF',
            data: this.monthEarningItems
          }],

          chart: {
            type: 'area',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
              show: false,
            },
            height: 60,
            sparkline: {
              enabled: true,
            },
            group: 'sparklines',
          },
          stroke: {
            curve: 'smooth',
            width: 2,
          },
          fill: {
            colors: ['#E8F7FF'],
            type: 'solid',
            opacity: 0.05,
          },
          markers: {
            size: 0,
          },
          tooltip: {
            theme: 'dark',
            x: {
              show: false,
            },
          },
        };

        this.monthlyChart2 = {
          series: [{
            name: 'Customer Value',
            color: '#49BEFF',
            data: this.yearEarningItems
          }],

          chart: {
            type: 'area',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
              show: false,
            },
            height: 60,
            sparkline: {
              enabled: true,
            },
            group: 'sparklines',
          },
          stroke: {
            curve: 'smooth',
            width: 2,
          },
          fill: {
            colors: ['#E8F7FF'],
            type: 'solid',
            opacity: 0.05,
          },
          markers: {
            size: 0,
          },
          tooltip: {
            theme: 'dark',
            x: {
              show: false,
            },
          },
        };
        console.log(data);
        if (data.status === "success") {
          this.itemCustomer = data.data;
        }
        this.salesOverviewChart2.series.push({
          name: 'Customer Value',
          data: this.itemCustomer.slice(0, 15).map((item) => item.contactValue).reverse(),
          color: '#49BEFF',
        });
        const firstFourItems = data.data.slice(0, 15);
        firstFourItems.forEach((item: any) => {
          const slicedDate = item.createdAt.slice(0, 10);
          this.salesOverviewChart2.xaxis.categories.unshift(slicedDate);
        });

        this.yearlyChart.series.push(this.itemCustomer.length)
        this.totalMonthEarning = this.itemCustomer
          .filter(item => {
            const isCurrentMonth = (Number(item['createdAt'].slice(5, 7)) === this.monthEarning + 1) && (Number(item['createdAt'].slice(0, 4)) === this.yearEarning);
            if (isCurrentMonth) {
              this.monthEarningItems.unshift(Number(item['contactValue']));
            }
            return isCurrentMonth;
          })
          .map(item => Number(item['contactValue']))
          .reduce((acc, curr) => acc + curr, 0);

        this.totalYearEarning = this.itemCustomer
          .filter(item => {
            const isCurrentMonth = (Number(item['createdAt'].slice(0, 4)) === this.yearEarning);
            if (isCurrentMonth) {
              this.yearEarningItems.unshift(Number(item['contactValue']));
            }
            return isCurrentMonth;
          })
          .map(item => Number(item['contactValue']))
          .reduce((acc, curr) => acc + curr, 0);
      },
      (error) => {
        console.log(error);
        const Toast = Swal.mixin({
          position: 'center',
          showConfirmButton: true,
          timer: 2000,
          timerProgressBar: true,
        });

        Toast.fire({ icon: "error", title: "Customer has been loaded unsuccessfully." });
      }
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}