import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexYAxis
} from 'ng-apexcharts';
import { NgApexchartsModule } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  yaxis: ApexYAxis | ApexYAxis[];
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  template: `
    <apx-chart
      *ngIf="chartOptions"
      [series]="chartOptions.series"
      [chart]="chartOptions.chart"
      [xaxis]="chartOptions.xaxis"
      [yaxis]="chartOptions.yaxis"
      [title]="chartOptions.title"
    ></apx-chart>
  `
})
export class AppComponent implements OnInit {
  chartOptions!: ChartOptions;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  this.http.get<any[]>('http://localhost:5274/api/cars').subscribe(rows => {
    const agg: Record<string, { sum: number; count: number }> = {};

    for (const r of rows) {
      const company = String(r['Company Names'] ?? '').trim();
      if (!company) continue;

      // string to float
      const raw = String(r['Total Speed'] ?? '');
      const price = parseFloat(raw.replace(/[^0-9.-]+/g, ''));
      if (isNaN(price)) continue;

      if (!agg[company]) agg[company] = { sum: 0, count: 0 };
      agg[company].sum += price;
      agg[company].count += 1;
    }

    // Compute averages
    let entries = Object.entries(agg).map(([company, { sum, count }]) => ({
      company,
      avg: sum / Math.max(1, count)
    }));

    // sort by highest average
    entries = entries.sort((a, b) => b.avg - a.avg);

    const companies = entries.map(e => e.company);
    const averages = entries.map(e => Number(e.avg.toFixed(2)));

    console.log('Grouped companies:', agg);
    console.log('Companies:', companies);
    console.log('Average total speed:', averages);

    this.chartOptions = {
      series: [{ name: 'Average Total Speed', data: averages }],
      chart: { type: 'bar', height: 420 },
      xaxis: { categories: companies },
      yaxis: { title: { text: 'Average Total Speed (km/h)' } },
      title: { text: 'Average Total Speed by Company', align: 'center' },
      // dataLabels: { enabled: true }
    };
  });
}

}
