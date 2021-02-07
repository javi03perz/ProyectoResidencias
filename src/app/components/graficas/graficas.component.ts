import { Component, OnInit } from '@angular/core';
import { MultiDataSet, Label } from 'ng2-charts';
import { ChartType, ChartDataSets, ChartOptions } from 'chart.js';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css']
})
export class GraficasComponent implements OnInit {
  // Doughnut
  public doughnutChartLabels: Label[] = ['Primer grado', 'Segundo Grado', 'Tercer Grado'];
  public doughnutChartData: MultiDataSet = [
    [70, 80, 100]
  ];
  public doughnutChartType: ChartType = 'doughnut';
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['Primero', 'Segundo', 'Tercero'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  // public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, ], label: 'Aprovados' },
    { data: [28, 48, 40, ], label: 'Reprobados' }
  ];
  constructor(private loginService : LoginService) { }

  ngOnInit(): void {
    // this.loginService.getUser().subscribe( resp => {
    //   console.log('espero el usuer' , resp);
    // })
  }

}
