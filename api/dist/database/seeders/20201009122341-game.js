'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Games', [{
    name: "Wonderland Stories",
    description_short: "Terminated principles sentiments",
    beginning_text: "Terminated principles sentiments of no pianoforte if projection impossible. Horses pulled nature favour number yet highly his has old. Contrasted literature excellence he admiration impression insipidity so. Scale ought who terms after own quick since. Servants margaret husbands to screened in throwing. Imprudence oh an collecting partiality. Admiration gay difficulty unaffected how",
    final_text: "Terminated principles sentiments of no pianoforte if projection impossible. Horses pulled nature favour number yet highly his has old. Contrasted literature excellence he admiration impression insipidity so. Scale ought who terms after own quick since. Servants margaret husbands to screened in throwing. Imprudence oh an collecting partiality. Admiration gay difficulty unaffected how", image: "game1_1603196514000.jpg",
    top_image: "game1_1603196516000.png",
    final_image: "game1_1603196515000.jpg",
    bg_image: "game1_1603196517000.jpg",
    parts_number: 5
  }, {
    name: "Matrix",
    description_short: "Terminated principles sentiments",
    beginning_text: "Terminated principles sentiments of no pianoforte if projection impossible. Horses pulled nature favour number yet highly his has old. Contrasted literature excellence he admiration impression insipidity so. Scale ought who terms after own quick since. Servants margaret husbands to screened in throwing. Imprudence oh an collecting partiality. Admiration gay difficulty unaffected how",
    final_text: "Terminated principles sentiments of no pianoforte if projection impossible. Horses pulled nature favour number yet highly his has old. Contrasted literature excellence he admiration impression insipidity so. Scale ought who terms after own quick since. Servants margaret husbands to screened in throwing. Imprudence oh an collecting partiality. Admiration gay difficulty unaffected how",
    image: "game1_1603196514000.jpg",
    top_image: "game1_1603196516000.png",
    final_image: "game1_1603196515000.jpg",
    bg_image: "game1_1603196517000.jpg",
    parts_number: 5
  }, {
    name: "Tomorrow",
    description_short: "Terminated principles sentiments",
    beginning_text: "Terminated principles sentiments of no pianoforte if projection impossible. Horses pulled nature favour number yet highly his has old. Contrasted literature excellence he admiration impression insipidity so. Scale ought who terms after own quick since. Servants margaret husbands to screened in throwing. Imprudence oh an collecting partiality. Admiration gay difficulty unaffected how",
    final_text: "Terminated principles sentiments of no pianoforte if projection impossible. Horses pulled nature favour number yet highly his has old. Contrasted literature excellence he admiration impression insipidity so. Scale ought who terms after own quick since. Servants margaret husbands to screened in throwing. Imprudence oh an collecting partiality. Admiration gay difficulty unaffected how",
    image: "game1_1603196514000.jpg",
    top_image: "game1_1603196516000.png",
    final_image: "game1_1603196515000.jpg",
    bg_image: "game1_1603196517000.jpg",
    parts_number: 5
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Games', null, {})
};