import { FilterModel, FilterStateModel, IFilterStateModel } from '../models';

export function convertFromRoute(converters, routeParams): FilterStateModel {
    let filterState: FilterStateModel = new FilterStateModel();
    converters
        .forEach((converter) => {
            let converterParams = [];
            converter.params.forEach((paramName) => {
                converterParams.push(routeParams[paramName]);
            });
            let filter = converter.convert(converterParams);
            Object.assign(filterState, filter.value);
        });
    Object.assign(filterState,
        { page: +routeParams['page'] || 1 },
        { sort: routeParams['sort'] || 'price-' },
        { limit: +routeParams['limit'] || 20 });
    return filterState;
};

export function buildFilterListFromRoute(converters, routeParams): Array<FilterModel> {
    let filters = new Array<FilterModel>();
    converters
        .forEach((converter) => {
            let converterParams = [];
            converter.params.forEach((paramName) => {
                converterParams.push(routeParams[paramName]);
            });
            let filter = converter.convert(converterParams);
            filters.push(Object.assign({ id: converter.converterId }, filter));
        });
    return filters;
};

export function convertToRoute(converters, filterState: IFilterStateModel): any {
    let route = {};
    converters
        .forEach((converter) => {
            let roteParam = converter.convertToRoute(filterState);
            if (roteParam) {
                Object.assign(route, roteParam);
            }
        });
    if (filterState.page !== 1)
        Object.assign(route, { page: filterState.page });
    if (filterState.sort !== 'price-')
        Object.assign(route, { sort: filterState.sort });
    if (filterState.limit !== 20)
        Object.assign(route, { limit: filterState.limit });
    return route;
};
