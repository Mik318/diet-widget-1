import { MealPlan, mealPlan } from '@/app/data/food-data';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

export interface ListAlimentos {
  name: string;
  completed: boolean;
  calorias?: number;
  listalimentos?: ListAlimentos[];
}

/**
 * @title Basic checkboxes
 */
@Component({
  selector: 'app-list-alimentos',
  templateUrl: './list-alimentos.component.html',
  styleUrl: './list-alimentos.component.scss',
  standalone: true,
  imports: [MatCheckboxModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListAlimentosBreakfast {
  readonly comida = signal<ListAlimentos>({
    name: 'Desayuno',
    completed: false,
    listalimentos: [
      { name: 'Proteina(Huevos)', completed: false, calorias: 200 },
      { name: 'Verduras', completed: false, calorias: 50 },
      { name: 'Fruta', completed: false, calorias: 70 },
    ],
  });

  readonly partiallyComplete = computed(() => {
    const task = this.comida();
    if (!task.listalimentos) {
      return false;
    }
    return task.listalimentos.some(t => t.completed) && !task.listalimentos.every(t => t.completed);
  });

  update(completed: boolean, index?: number) {
    this.comida.update(c => {
      if (index === undefined) {
        c.completed = completed;
        c.listalimentos?.forEach(t => (t.completed = completed));
      } else {
        c.listalimentos![index].completed = completed;
        c.completed = c.listalimentos?.every(t => t.completed) ?? true;
      }
      return { ...c };
    });
  }
}
