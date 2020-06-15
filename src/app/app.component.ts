import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from './services/funcionario.service';
import { Funcionario } from './models/funcionario';
import { NgForm } from '@angular/forms';
import { MenuItem } from 'primeng/api/menuitem';

import { ConfirmationService, Message } from 'primeng/api';

import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], providers: [ConfirmationService]
})
export class AppComponent implements OnInit {

  first = 0;
  rows = 5;

  funcionario = {} as Funcionario;
  items: MenuItem[];

  funcionarios: Funcionario[];
  selectedFuncionarios: Funcionario[];

  cols: any[];

  exportColumns: any[];

  msgs: Message[] = [];

  constructor(private funcionarioService: FuncionarioService,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.getFuncionarios();

    // this.funcionarioService.getFuncionarios().then(this.funcionarios => this.funcionarios = this.funcionarios);

    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'nome', header: 'Nome' },
      { field: 'departamento', header: 'Departamento' }
    ];

    this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));

    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
      },
      {
        label: 'Cadastros',
        icon: 'pi pi-fw pi-save',
        items: [{
          label: 'New',
          icon: 'pi pi-fw pi-plus',
          items: [
            { label: 'Project' },
            { label: 'Other' },
          ]
        },
        { label: 'Open' },
        { label: 'Quit' }
        ]
      },
      {
        label: 'Processos',
        icon: 'pi pi-fw pi-sitemap',
        items: [
          { label: 'Proc Rel', icon: 'pi pi-fw pi-table' },
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
        ]
      },
      {
        label: 'Relatórios',
        icon: 'pi pi-fw pi-print',
        items: [
          { label: 'Delete', icon: 'pi pi-fw pi-trash' },
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
        ]
      }
    ];

  }

  exportPdf() {
    // tslint:disable-next-line: no-shadowed-variable
    import('jspdf').then(jsPDF => {
      import('jspdf-autotable').then(x => {
        const doc = new jsPDF.default(0, 0);
        doc.text('Relatório de Funcionários', 70, 10);
        doc.autoTable(this.exportColumns, this.funcionarios);
        doc.save('Lista de Funcionários.pdf');
        doc.output('dataurlnewwindow');
      });
    });
  }

  exportExcel() {
    import('xlsx').then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.funcionarios);
      // tslint:disable-next-line: object-literal-key-quotes
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['Funcionários'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'Lista de Funcionários');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then(FileSaver => {
      // tslint:disable-next-line: prefer-const
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      // tslint:disable-next-line: prefer-const
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }

  getFuncs() {
    // tslint:disable-next-line: prefer-const
    let funcionarios = [];
    // tslint:disable-next-line: prefer-const
    for (let func of this.funcionarios) {
      // func.nome = func.nome.toString();
      // func.departamento = func.departamento.toString();
      console.log('funcExcel: ' + func.nome);
      funcionarios.push(func);
    }
    console.log(funcionarios);
    return JSON.parse(JSON.stringify(funcionarios));
  }


  // defini se um funcionario será criado ou atualizado
  saveFuncionario(form: NgForm) {
    if (this.funcionario.id !== undefined) {
      this.funcionarioService.updateFuncionario(this.funcionario).subscribe(() => {
        this.cleanForm(form);
        this.msgs = [{ severity: 'success', summary: 'Confirmado', detail: 'Registro alterado com sucesso' }];
      });
    } else {
      this.funcionarioService.saveFuncionario(this.funcionario).subscribe(() => {
        this.cleanForm(form);
        this.msgs = [{ severity: 'success', summary: 'Confirmado', detail: 'Registro salvo com sucesso' }];
      });
    }
  }

  // Chama o serviço para obtém todos os funcionarios
  getFuncionarios() {
    this.funcionarioService.getFuncionarios().subscribe((funcionarios: Funcionario[]) => {
      this.funcionarios = funcionarios;
    });
  }

  // deleta um Funcionarioro
  deleteFuncionario(funcionario: Funcionario) {
    this.funcionarioService.deleteFuncionario(funcionario).subscribe(() => {
      this.getFuncionarios();
    });
  }

  // copia o Funcionario para ser editado.
  editFuncionario(funcionario: Funcionario) {
    this.funcionario = { ...funcionario };

    // não atualiza, grava novo registro
    /*     this.funcionario.nome = funcionario.nome;
        this.funcionario.departamento = funcionario.departamento; */

  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getFuncionarios();
    form.resetForm();
    this.funcionario = {} as Funcionario;
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.first === (this.funcionarios.length - this.rows);
  }

  isFirstPage(): boolean {
    return this.first === 0;
  }

  confirm(funcionario: Funcionario) {
    this.confirmationService.confirm({
      message: 'Deseja excluir o registro ' + funcionario.nome + '?',
      header: 'Confirmação de Exclusão',
      icon: 'pi pi-info-circle',
      accept: () => {
        // tslint:disable-next-line: no-unused-expression
        console.log('Funcionário a ser deletado: ' + this.funcionario);
        this.deleteFuncionario(funcionario);
        this.msgs = [{ severity: 'success', summary: 'Confirmado', detail: 'Registro excluído com sucesso' }];
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejeitado', detail: 'Exclusão não executada' }];
      }
    });
  }

}
