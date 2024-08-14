// Interfaces
import { IMenu, IMenuItem, IMenuItemsTree } from '@/utils/interfaces/menus';

import { getClient } from '@/utils/lib/apollo-client';
import { getTopLevelPages } from '@/utils/lib/pages';
import { QUERY_ALL_MENUS } from '@/utils/data/menus';
import { IPage } from '../interfaces/pages';

export const MENU_LOCATION_NAVIGATION_DEFAULT = 'navmenu';

/**
 * getAllMenus
 */

export async function getAllMenus() {
    const apolloClient = getClient();

    const data = await apolloClient.query({
        query: QUERY_ALL_MENUS,
    });

    const menus = data?.data.menus.edges.map(mapMenuData);

    const defaultNavigation = createMenuFromPages(
        [MENU_LOCATION_NAVIGATION_DEFAULT],
        await getTopLevelPages({
            queryIncludes: 'index',
        }),
    );

    menus.push(defaultNavigation);

    return {
        menus,
    };
}

/**
 * mapMenuData
 */

export function mapMenuData(menu = {}) {
    const { node } = menu;
    const data = { ...node };

    data.menuItems = data.menuItems.edges.map(({ node }) => {
        return { ...node };
    });

    return data;
}

/**
 * mapPagesToMenuItems
 */

export function mapPagesToMenuItems(pages: Array<IPage>) {
    return pages.map(({ id, uri, title }: IPage) => {
        return {
            label: title,
            path: uri,
            id,
        };
    });
}

/**
 * createMenuFromPages
 */

export function createMenuFromPages( 
    locations: Array<string>, 
    pages: Array<IPage>
): IMenu {
    return {
        id: 'defaultpages',
        menuItems: mapPagesToMenuItems(pages),
        locations,
    };
}

/**
 * Parse hierarchical menu from Menu object
 * 
 * @param data Flat list of menu items
 * @param param1 object of keys
 * @returns Hierarchical tree of menu
 */
export const parseHierarchicalMenu = (
    data: Array<object> = [],
    {
        idKey = 'id',
        parentKey = 'parentId',
        childrenKey = 'children'
    } = {}
): IMenuItemsTree => {
    const tree: Array<IMenuItem> = [];
    const childrenOf = {};

    data.forEach((item) => {
        const newItem = { ...item };
        const { [idKey]: id, [parentKey]: parentId = 0 } = newItem;
        childrenOf[id] = childrenOf[id] || [];
        newItem[childrenKey] = childrenOf[id];
        parentId ? (childrenOf[parentId] = childrenOf[parentId] || []).push(newItem) : tree.push(newItem);
    });
    return tree;
};

/**
 * Find menu from all menus data by location
 * 
 * @param menus All menus
 * @param location Menu location
 * @returns Tree of menu items
 */
export function findMenuByLocation(menus: Array<IMenu>, location: string): IMenuItemsTree {
    if (typeof location !== 'string') {
        throw new Error('Find menu by location - location is not a string.');
    }

    const menu = menus.find(
        ({ locations }: IMenu) => {
            return locations.map(
                (loc: string) => loc.toUpperCase()).includes(location.toUpperCase()
                );
        }
    );

    if (menu === undefined || menu.menuItems === undefined) {
        throw new Error('Find menu by location - menu not found.');
    }

    return menu && parseHierarchicalMenu(menu.menuItems);
}
