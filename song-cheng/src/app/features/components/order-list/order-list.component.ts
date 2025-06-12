import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { takeUntil } from 'rxjs';
import { ReactiveComponent } from '../../../core/utils/reactive.component';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
  ],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent extends ReactiveComponent implements OnInit {
  dataSource = new MatTableDataSource<Order>();
  displayedColumns = ['toggle', 'date', 'price', 'type'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private orderService: OrderService) {
    super();
  }

  ngOnInit(): void {
    this.orderService
      .getAll()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((orders) => {
        orders.forEach((o) => (o.expanded = false));
        this.dataSource.data = orders;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  isDetailRow = (_: number, r: Order) => r.expanded === true;
}
