import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pagina } from '../../../../models/pagina.model';
import { PaginaService } from '../../../../services/pagina.service';

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.css']
})
export class PaginaComponent implements OnInit {
  pagina!: Pagina;

  constructor(
    private route: ActivatedRoute,
    private paginaService: PaginaService
  ) { }

  ngOnInit(): void {
    // Suscribirse a cambios de parámetro "slug"
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        this.loadPagina(slug);
      }
    });
  }

  loadPagina(slug: string) {
    this.paginaService.getPaginaBySlug(slug).subscribe(res => {
      this.pagina = res;
      console.log('Página cargada:', this.pagina);
    });
  }
}
