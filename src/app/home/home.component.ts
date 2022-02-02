import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { iResultado } from '../models/iResultadoInput';
import { QuoteService } from './quote.service';
import { RealTimeDB } from '../database/realtime.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;
  numerosPrimos: number[] = [3, 5, 7];
  arreglosBandera: number[] = [];
  numeroInput: number = 0;
  tablaResultados: iResultado[] = [];

  constructor(private quoteService: QuoteService, private realTimeDB: RealTimeDB) {}

  ngOnInit() {
    this.isLoading = true;
    this.quoteService
      .getRandomQuote({ category: 'dev' })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((quote: string) => {
        this.quote = quote;
      });

    this.cargaDatos();
  }

  async cargaDatos() {
    //var datos =  this.realTimeDB.getDataList()
    //console.log("datos db: ", datos)

    this.realTimeDB.getDataList2().subscribe((resp) => {
      console.log('resp: ', resp);
      this.tablaResultados = resp;
    });
  }

  onlyNumbers(event: any) {
    var charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  gcd(x: number, y: number): number {
    if (y === 0) return x;
    return this.gcd(y, x % y);
  }

  async validarNumero() {
    console.log('validarNumero: ', this.numeroInput);
    this.arreglosBandera = [];

    this.numerosPrimos.forEach((numero: number, idx) => {
      if (this.gcd(this.numeroInput, numero) == numero) {
        this.arreglosBandera.push(numero);
      }
    });

    if (this.arreglosBandera.length != 0) {
      console.log('si tiene multiplos de: ', this.arreglosBandera);
      let flagMin = Math.min(...this.arreglosBandera);
      const resultado: iResultado = {
        numeroIngresado: this.numeroInput,
        multiplos: this.arreglosBandera,
        min: flagMin,
      };
      let temp = await this.realTimeDB.insert(resultado);
      console.log('temp: ', temp);
    } else {
      console.log('no tiene multiplos de: ', this.arreglosBandera);
      alert('este número no tiene multiplos de [3,5,7] ');
    }
    this.numeroInput = 0;
    console.log('this.tablaResultados: ', this.tablaResultados);
  }
}
