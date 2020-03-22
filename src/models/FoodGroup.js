import { ReactComponent as Grains } from './../assets/images/grains.svg';
import { ReactComponent as Protein } from './../assets/images/protein.svg';
import { ReactComponent as Vegetables } from './../assets/images/vegetables.svg';
import { ReactComponent as Fruits } from './../assets/images/fruits.svg';
import { ReactComponent as Dairy } from './../assets/images/dairy.svg';
import { ReactComponent as Oils } from './../assets/images/oils.svg';
import { Consumption } from 'emergency-food-guide';

class FoodGroup {
  static all(people) {
    const consumption = new Consumption(people);

    return {
      grains: {
        icon: Grains,
        link: 'https://www.choosemyplate.gov/eathealthy/grains',
        quantity: consumption.ofCategory('grains').quantity,
      },
      protein: {
        icon: Protein,
        link: 'https://www.choosemyplate.gov/eathealthy/protein-foods',
        quantity: consumption.ofCategory('protein').quantity,
      },
      vegetables: {
        icon: Vegetables,
        link: 'https://www.choosemyplate.gov/eathealthy/vegetables',
        quantity: consumption.ofCategory('vegetables').quantity,
      },
      fruits: {
        icon: Fruits,
        link: 'https://www.choosemyplate.gov/eathealthy/fruits',
        quantity: consumption.ofCategory('fruits').quantity,
      },
      dairy: {
        icon: Dairy,
        link: 'https://www.choosemyplate.gov/eathealthy/dairy',
        quantity: consumption.ofCategory('dairy').quantity,
      },
      oils: {
        icon: Oils,
        link: 'https://www.choosemyplate.gov/eathealthy/oils',
        quantity: consumption.ofCategory('oils').quantity,
      },
    };
  }
}

export default FoodGroup;
