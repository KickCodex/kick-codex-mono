import { pluralize, underscore, singularize } from 'inflection';
import { DefaultNamingStrategy, Table } from 'typeorm';

export class CustomNamingStrategy extends DefaultNamingStrategy {
    tableName(targetName: string, userSpecifiedName: string | undefined): string {
        if (userSpecifiedName) return userSpecifiedName;
        let tableName = targetName.replace('Entity', '');
        tableName = pluralize(tableName);
        tableName = underscore(tableName);
        return tableName;
    }
    columnName(propertyName: string, userSpecifiedName: string, embeddedPrefixes: string[]): string {
        if (userSpecifiedName) return userSpecifiedName;
        return underscore(propertyName);
    }
    joinColumnName(relationName: string, referencedColumnName: string): string {
        return `${relationName}_${referencedColumnName}`;
    }

    indexName(tableOrName: Table | string, columnNames: string[], where?: string): string {
        const tableName = tableOrName instanceof Table ? tableOrName.name : tableOrName;

        return `${singularize(tableName)}.${columnNames.join('_')}`;
    }
}
