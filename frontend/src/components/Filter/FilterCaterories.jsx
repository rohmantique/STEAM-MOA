import React from "react";
import FilterItems from "./FilterItems";

const FilterCaterories = (props) => {
  const { id, name, items } = props.category;
  const { filter, setFilter } = props;

  const checkedItemHandler = (item, isChecked) => {
    if (isChecked) {
      //필터에 추가
      setFilter([...filter, { category: id, item: item.id, name: item.name }]);
    } else if (!isChecked) {
      //필터에 있는 체크 삭제
      setFilter(
        filter.filter((filterItem) => {
          return filterItem.category !== id || filterItem.item !== item.id ? true : false;
        })
      );
    }
  };

  const isChecked = (category_id, item_id) => {
    //필터에 해당 요소가 있으면 true, 없으면 false(undefined)
    const i = filter.find((filterItem) => {
      return filterItem.category === category_id && filterItem.item === item_id ? true : false;
    });
    return !!i;
  };

  return (
    <div className="grid grid-cols-12 mb-2">
      <span className="tablet:col-span-2 col-span-3 font-semibold text-white m-auto tablet:text-[0.9em] text-[0.8em]">
        {name}
      </span>
      <div className=" tablet:col-span-10 col-span-9 grid laptop:grid-cols-5 tablet:grid-cols-4 mobile:grid-cols-2 gap-2 whitespace-nowrap tablet:text-[0.9em] text-[0.8em]">
        {items.map((item) => (
          <FilterItems
            key={item.id}
            item={item}
            check={isChecked(id, item.id)}
            checkedItemHandler={checkedItemHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default FilterCaterories;
