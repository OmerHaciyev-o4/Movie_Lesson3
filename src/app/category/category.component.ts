import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { CategoryRepository } from '../models/category.repository';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: Category[];
  repository: CategoryRepository;

  constructor() {
      this.repository=new CategoryRepository();
      this.categories=this.repository.getCategories();
  }
  
  ngOnInit(): void {
  }

  changeActive(list:any, id: number){
    for (let i = 0; i < list.children.length; i++) {
      const element = list.children[i];
      element.classList.remove("active");
      element.classList.add("pointer");
    }

    document.getElementById(id.toString()).classList.add("active");
    document.getElementById(id.toString()).classList.remove("pointer");
  }
}