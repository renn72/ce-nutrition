import * as _trpc_server from '@trpc/server';
import * as zod from 'zod';
import * as next_auth from 'next-auth';
import * as _libsql_client from '@libsql/client';
import * as drizzle_orm_libsql from 'drizzle-orm/libsql';
import * as next_auth_adapters from 'next-auth/adapters';
import * as drizzle_orm from 'drizzle-orm';
import * as drizzle_orm_sqlite_core from 'drizzle-orm/sqlite-core';

declare const user: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "user";
    schema: undefined;
    columns: {
        id: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id";
            tableName: "user";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: 255;
        }>;
        name: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "name";
            tableName: "user";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        firstName: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "first_name";
            tableName: "user";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        lastName: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "last_name";
            tableName: "user";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        clerkId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "clerk_id";
            tableName: "user";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        birthDate: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "birth_date";
            tableName: "user";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        gender: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "gender";
            tableName: "user";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        address: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "address";
            tableName: "user";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        notes: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "notes";
            tableName: "user";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        instagram: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "instagram";
            tableName: "user";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        openLifter: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "open_lifter";
            tableName: "user";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        phone: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "phone";
            tableName: "user";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        email: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "email";
            tableName: "user";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        emailVerified: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "email_verified";
            tableName: "user";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        password: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "password";
            tableName: "user";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        currentPlanId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "current_plan_id";
            tableName: "user";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        image: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "image";
            tableName: "user";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        isFake: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "is_fake";
            tableName: "user";
            dataType: "boolean";
            columnType: "SQLiteBoolean";
            data: boolean;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        isTrainer: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "is_trainer";
            tableName: "user";
            dataType: "boolean";
            columnType: "SQLiteBoolean";
            data: boolean;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        isRoot: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "is_root";
            tableName: "user";
            dataType: "boolean";
            columnType: "SQLiteBoolean";
            data: boolean;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        isCreator: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "is_creator";
            tableName: "user";
            dataType: "boolean";
            columnType: "SQLiteBoolean";
            data: boolean;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        isAllTrainers: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "is_all_trainers";
            tableName: "user";
            dataType: "boolean";
            columnType: "SQLiteBoolean";
            data: boolean;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "created_at";
            tableName: "user";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updatedAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "updated_at";
            tableName: "user";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "sqlite";
}>;
declare const userRelations: drizzle_orm.Relations<"user", {
    roles: drizzle_orm.Many<"role">;
    notifications: drizzle_orm.Many<"notification">;
    notificationsToggles: drizzle_orm.Many<"notification_toggle">;
    messages: drizzle_orm.Many<"message">;
    sentMessages: drizzle_orm.Many<"message">;
    accounts: drizzle_orm.Many<"account">;
    trainers: drizzle_orm.Many<"user_to_trainer">;
    clients: drizzle_orm.Many<"user_to_trainer">;
    userPlans: drizzle_orm.Many<"user_plan">;
    userPlansCreator: drizzle_orm.Many<"user_plan">;
    dailyLogs: drizzle_orm.Many<"daily_log">;
    weighIns: drizzle_orm.Many<"weigh_in">;
    weighInsTrainer: drizzle_orm.Many<"weigh_in">;
    skinfolds: drizzle_orm.Many<"skinfold">;
    skinfoldsCreator: drizzle_orm.Many<"skinfold">;
    bodyFat: drizzle_orm.Many<"body_fat">;
    leanMass: drizzle_orm.Many<"lean_mass">;
    bodyWeight: drizzle_orm.Many<"body_weight">;
    images: drizzle_orm.Many<"images">;
    settings: drizzle_orm.One<"user_settings", true>;
    tags: drizzle_orm.Many<"tag">;
    girthMeasurements: drizzle_orm.Many<"girth_measurement">;
    goals: drizzle_orm.Many<"goals">;
    goalsTrainer: drizzle_orm.Many<"goals">;
    trainerNotes: drizzle_orm.Many<"trainer_notes">;
    trainerNotesTrainer: drizzle_orm.Many<"trainer_notes">;
    supplementStacks: drizzle_orm.Many<"supplement_stack">;
    category: drizzle_orm.Many<"user_to_user_category">;
}>;
declare const notificationToggle: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "notification_toggle";
    schema: undefined;
    columns: {
        id: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id";
            tableName: "notification_toggle";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "created_at";
            tableName: "notification_toggle";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        userId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "user_id";
            tableName: "notification_toggle";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        type: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "type";
            tableName: "notification_toggle";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        interval: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "interval";
            tableName: "notification_toggle";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        sleep: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "sleep";
            tableName: "notification_toggle";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
    };
    dialect: "sqlite";
}>;
declare const notificationToggleRelations: drizzle_orm.Relations<"notification_toggle", {
    user: drizzle_orm.One<"user", true>;
}>;
declare const userToUserCategory: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "user_to_user_category";
    schema: undefined;
    columns: {
        userId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "user_id";
            tableName: "user_to_user_category";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        categoryId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "category_id";
            tableName: "user_to_user_category";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "sqlite";
}>;
declare const usertoUserCategoryRelations: drizzle_orm.Relations<"user_to_user_category", {
    user: drizzle_orm.One<"user", true>;
    category: drizzle_orm.One<"user_category", true>;
}>;
declare const userCategory: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "user_category";
    schema: undefined;
    columns: {
        id: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id";
            tableName: "user_category";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        name: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "name";
            tableName: "user_category";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
    };
    dialect: "sqlite";
}>;
declare const userCategoryRelations: drizzle_orm.Relations<"user_category", {
    users: drizzle_orm.Many<"user_to_user_category">;
}>;
declare const supplementStack: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "supplement_stack";
    schema: undefined;
    columns: {
        id: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id";
            tableName: "supplement_stack";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "created_at";
            tableName: "supplement_stack";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updatedAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "updated_at";
            tableName: "supplement_stack";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        userId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "user_id";
            tableName: "supplement_stack";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        name: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "name";
            tableName: "supplement_stack";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        time: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "time";
            tableName: "supplement_stack";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        isTemplate: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "is_template";
            tableName: "supplement_stack";
            dataType: "boolean";
            columnType: "SQLiteBoolean";
            data: boolean;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "sqlite";
}>;
declare const supplementStackRelations: drizzle_orm.Relations<"supplement_stack", {
    user: drizzle_orm.One<"user", true>;
    supplements: drizzle_orm.Many<"supplement_to_supplement_stack">;
}>;
declare const supplementToSupplementStack: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "supplement_to_supplement_stack";
    schema: undefined;
    columns: {
        id: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id";
            tableName: "supplement_to_supplement_stack";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        supplementId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "supplement_id";
            tableName: "supplement_to_supplement_stack";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        supplementStackId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "supplement_stack_id";
            tableName: "supplement_to_supplement_stack";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        size: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "size";
            tableName: "supplement_to_supplement_stack";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        unit: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "unit";
            tableName: "supplement_to_supplement_stack";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
    };
    dialect: "sqlite";
}>;
declare const supplementToSupplementStackRelations: drizzle_orm.Relations<"supplement_to_supplement_stack", {
    supplement: drizzle_orm.One<"ingredient", true>;
    supplementStack: drizzle_orm.One<"supplement_stack", true>;
}>;
declare const trainerNotes: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "trainer_notes";
    schema: undefined;
    columns: {
        id: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id";
            tableName: "trainer_notes";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "created_at";
            tableName: "trainer_notes";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updatedAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "updated_at";
            tableName: "trainer_notes";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        userId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "user_id";
            tableName: "trainer_notes";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        title: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "title";
            tableName: "trainer_notes";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        description: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "description";
            tableName: "trainer_notes";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        state: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "state";
            tableName: "trainer_notes";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        trainerId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "trainer_id";
            tableName: "trainer_notes";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
    };
    dialect: "sqlite";
}>;
declare const trainerNotesRelations: drizzle_orm.Relations<"trainer_notes", {
    user: drizzle_orm.One<"user", true>;
    trainer: drizzle_orm.One<"user", true>;
}>;
declare const goals: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "goals";
    schema: undefined;
    columns: {
        id: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id";
            tableName: "goals";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "created_at";
            tableName: "goals";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updatedAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "updated_at";
            tableName: "goals";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        userId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "user_id";
            tableName: "goals";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        title: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "title";
            tableName: "goals";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        description: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "description";
            tableName: "goals";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        state: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "state";
            tableName: "goals";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        completedAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "completed_at";
            tableName: "goals";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        trainerId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "trainer_id";
            tableName: "goals";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
    };
    dialect: "sqlite";
}>;
declare const goalsRelations: drizzle_orm.Relations<"goals", {
    user: drizzle_orm.One<"user", true>;
    trainer: drizzle_orm.One<"user", true>;
}>;
declare const userSettings: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "user_settings";
    schema: undefined;
    columns: {
        id: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id";
            tableName: "user_settings";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "created_at";
            tableName: "user_settings";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updatedAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "updated_at";
            tableName: "user_settings";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        userId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "user_id";
            tableName: "user_settings";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        defaultWater: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "default_water";
            tableName: "user_settings";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        defaultChartRange: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "default_chart_range";
            tableName: "user_settings";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        isPosing: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "is_posing";
            tableName: "user_settings";
            dataType: "boolean";
            columnType: "SQLiteBoolean";
            data: boolean;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        isBloodGlucose: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "is_blood_glucose";
            tableName: "user_settings";
            dataType: "boolean";
            columnType: "SQLiteBoolean";
            data: boolean;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        isSleep: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "is_sleep";
            tableName: "user_settings";
            dataType: "boolean";
            columnType: "SQLiteBoolean";
            data: boolean;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        isSleepQuality: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "is_sleep_quality";
            tableName: "user_settings";
            dataType: "boolean";
            columnType: "SQLiteBoolean";
            data: boolean;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        isNap: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "is_nap";
            tableName: "user_settings";
            dataType: "boolean";
            columnType: "SQLiteBoolean";
            data: boolean;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        isWeightTraining: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "is_weight";
            tableName: "user_settings";
            dataType: "boolean";
            columnType: "SQLiteBoolean";
            data: boolean;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        isHiit: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "is_hiit";
            tableName: "user_settings";
            dataType: "boolean";
            columnType: "SQLiteBoolean";
            data: boolean;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        isLiss: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "is_liss";
            tableName: "user_settings";
            dataType: "boolean";
            columnType: "SQLiteBoolean";
            data: boolean;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        isNotes: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "is_notes";
            tableName: "user_settings";
            dataType: "boolean";
            columnType: "SQLiteBoolean";
            data: boolean;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        isSteps: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "is_steps";
            tableName: "user_settings";
            dataType: "boolean";
            columnType: "SQLiteBoolean";
            data: boolean;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        isSauna: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "is_sauna";
            tableName: "user_settings";
            dataType: "boolean";
            columnType: "SQLiteBoolean";
            data: boolean;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        isColdPlunge: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "is_cold_plunge";
            tableName: "user_settings";
            dataType: "boolean";
            columnType: "SQLiteBoolean";
            data: boolean;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "sqlite";
}>;
declare const userSettingsRelations: drizzle_orm.Relations<"user_settings", {
    user: drizzle_orm.One<"user", true>;
}>;
declare const weighIn: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "weigh_in";
    schema: undefined;
    columns: {
        id: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id";
            tableName: "weigh_in";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "created_at";
            tableName: "weigh_in";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        userId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "user_id";
            tableName: "weigh_in";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        trainerId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "trainer_id";
            tableName: "weigh_in";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        date: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "date";
            tableName: "weigh_in";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        bodyWeight: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "body_weight";
            tableName: "weigh_in";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        leanMass: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "lean_mass";
            tableName: "weigh_in";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        bodyFat: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "body_fat";
            tableName: "weigh_in";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        bloodPressure: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "blood_pressure";
            tableName: "weigh_in";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        image: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "image";
            tableName: "weigh_in";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        notes: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "notes";
            tableName: "weigh_in";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
    };
    dialect: "sqlite";
}>;
declare const weighInRelations: drizzle_orm.Relations<"weigh_in", {
    user: drizzle_orm.One<"user", true>;
    trainer: drizzle_orm.One<"user", true>;
}>;
declare const userToTrainer: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "user_to_trainer";
    schema: undefined;
    columns: {
        userId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "user_id";
            tableName: "user_to_trainer";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        trainerId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "trainer_id";
            tableName: "user_to_trainer";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
    };
    dialect: "sqlite";
}>;
declare const role: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "role";
    schema: undefined;
    columns: {
        id: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id";
            tableName: "role";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "created_at";
            tableName: "role";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updatedAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "updated_at";
            tableName: "role";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        userId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "user_id";
            tableName: "role";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        name: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "name";
            tableName: "role";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
    };
    dialect: "sqlite";
}>;
declare const account: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "account";
    schema: undefined;
    columns: {
        userId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "user_id";
            tableName: "account";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: 255;
        }>;
        type: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "type";
            tableName: "account";
            dataType: "string";
            columnType: "SQLiteText";
            data: next_auth_adapters.AdapterAccountType;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: 255;
            $type: next_auth_adapters.AdapterAccountType;
        }>;
        provider: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "provider";
            tableName: "account";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: 255;
        }>;
        providerAccountId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "provider_account_id";
            tableName: "account";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: 255;
        }>;
        refresh_token: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "refresh_token";
            tableName: "account";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        access_token: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "access_token";
            tableName: "account";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        expires_at: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "expires_at";
            tableName: "account";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        token_type: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "token_type";
            tableName: "account";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: 255;
        }>;
        scope: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "scope";
            tableName: "account";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: 255;
        }>;
        id_token: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id_token";
            tableName: "account";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        session_state: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "session_state";
            tableName: "account";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: 255;
        }>;
    };
    dialect: "sqlite";
}>;
declare const verificationToken: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "verification_token";
    schema: undefined;
    columns: {
        identifier: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "identifier";
            tableName: "verification_token";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: 255;
        }>;
        token: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "token";
            tableName: "verification_token";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: 255;
        }>;
        expires: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "expires";
            tableName: "verification_token";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "sqlite";
}>;
declare const session: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "session";
    schema: undefined;
    columns: {
        sessionToken: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "session_token";
            tableName: "session";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: 255;
        }>;
        userId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "userId";
            tableName: "session";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: 255;
        }>;
        expires: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "expires";
            tableName: "session";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "sqlite";
}>;
declare const sessionsRelations: drizzle_orm.Relations<"session", {
    user: drizzle_orm.One<"user", true>;
}>;
declare const accountsRelations: drizzle_orm.Relations<"account", {
    user: drizzle_orm.One<"user", true>;
}>;
declare const roleRelations: drizzle_orm.Relations<"role", {
    user: drizzle_orm.One<"user", false>;
}>;
declare const userToTrainerRelations: drizzle_orm.Relations<"user_to_trainer", {
    user: drizzle_orm.One<"user", true>;
    trainer: drizzle_orm.One<"user", true>;
}>;

declare const notification: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "notification";
    schema: undefined;
    columns: {
        id: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id";
            tableName: "notification";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "created_at";
            tableName: "notification";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        userId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "user_id";
            tableName: "notification";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        code: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "code";
            tableName: "notification";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        title: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "title";
            tableName: "notification";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        description: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "description";
            tableName: "notification";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        isRead: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "is_read";
            tableName: "notification";
            dataType: "boolean";
            columnType: "SQLiteBoolean";
            data: boolean;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        isViewed: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "is_viewed";
            tableName: "notification";
            dataType: "boolean";
            columnType: "SQLiteBoolean";
            data: boolean;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        isDeleted: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "is_deleted";
            tableName: "notification";
            dataType: "boolean";
            columnType: "SQLiteBoolean";
            data: boolean;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        notes: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "notes";
            tableName: "notification";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
    };
    dialect: "sqlite";
}>;
declare const notificationRelations: drizzle_orm.Relations<"notification", {
    user: drizzle_orm.One<"user", false>;
}>;

declare const ingredient: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "ingredient";
    schema: undefined;
    columns: {
        id: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id";
            tableName: "ingredient";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "created_at";
            tableName: "ingredient";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updatedAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "updated_at";
            tableName: "ingredient";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        userId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "user_id";
            tableName: "ingredient";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        favouriteAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "favourite_at";
            tableName: "ingredient";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        deletedAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "deleted_at";
            tableName: "ingredient";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        hiddenAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "hidden_at";
            tableName: "ingredient";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        isAusFood: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "is_aus_food";
            tableName: "ingredient";
            dataType: "boolean";
            columnType: "SQLiteBoolean";
            data: boolean;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        isAllStores: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "is_all_stores";
            tableName: "ingredient";
            dataType: "boolean";
            columnType: "SQLiteBoolean";
            data: boolean;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        serveSize: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "serve_size";
            tableName: "ingredient";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        serveUnit: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "serve_unit";
            tableName: "ingredient";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        publicFoodKey: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "public_food_key";
            tableName: "ingredient";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        classification: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "classification";
            tableName: "ingredient";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        foodName: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "food_name";
            tableName: "ingredient";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        name: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "name";
            tableName: "ingredient";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        caloriesWFibre: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "calories_w_fibre";
            tableName: "ingredient";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        caloriesWOFibre: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "calories_wo_fibre";
            tableName: "ingredient";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        protein: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "protein";
            tableName: "ingredient";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        fatTotal: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "fat_total";
            tableName: "ingredient";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        totalDietaryFibre: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "total_dietary_fibre";
            tableName: "ingredient";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        totalSugars: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "total_sugars";
            tableName: "ingredient";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        starch: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "starch";
            tableName: "ingredient";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        resistantStarch: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "resistant_starch";
            tableName: "ingredient";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        availableCarbohydrateWithoutSugarAlcohols: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "available_carbohydrate_without_sugar_alcohols";
            tableName: "ingredient";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        availableCarbohydrateWithSugarAlcohols: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "available_carbohydrate_with_sugar_alcohols";
            tableName: "ingredient";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        isUserCreated: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "is_user_created";
            tableName: "ingredient";
            dataType: "boolean";
            columnType: "SQLiteBoolean";
            data: boolean;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        isSupplement: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "is_supplement";
            tableName: "ingredient";
            dataType: "boolean";
            columnType: "SQLiteBoolean";
            data: boolean;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        isPrivate: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "is_private";
            tableName: "ingredient";
            dataType: "boolean";
            columnType: "SQLiteBoolean";
            data: boolean;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        viewableBy: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "viewable_by";
            tableName: "ingredient";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        intervale: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "intervale";
            tableName: "ingredient";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        notes: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "notes";
            tableName: "ingredient";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
    };
    dialect: "sqlite";
}>;
declare const ingredientAdditionOne: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "ingredient_addition_one";
    schema: undefined;
    columns: {
        id: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id";
            tableName: "ingredient_addition_one";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "created_at";
            tableName: "ingredient_addition_one";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updatedAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "updated_at";
            tableName: "ingredient_addition_one";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        ingredientId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "ingredient_id";
            tableName: "ingredient_addition_one";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        energyWithDietaryFibre: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "energy_with_dietary_fibre";
            tableName: "ingredient_addition_one";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        energyWithoutDietaryFibre: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "energy_without_dietary_fibre";
            tableName: "ingredient_addition_one";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        addedSugars: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "added_sugars";
            tableName: "ingredient_addition_one";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        freeSugars: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "free_sugars";
            tableName: "ingredient_addition_one";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        moisture: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "moisture";
            tableName: "ingredient_addition_one";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        nitrogen: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "nitrogen";
            tableName: "ingredient_addition_one";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        alcohol: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "alcohol";
            tableName: "ingredient_addition_one";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        fructose: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "fructose";
            tableName: "ingredient_addition_one";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        glucose: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "glucose";
            tableName: "ingredient_addition_one";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        sucrose: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "sucrose";
            tableName: "ingredient_addition_one";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        maltose: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "maltose";
            tableName: "ingredient_addition_one";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        lactose: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "lactose";
            tableName: "ingredient_addition_one";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        galactose: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "galactose";
            tableName: "ingredient_addition_one";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        maltotrios: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "maltotrios";
            tableName: "ingredient_addition_one";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        ash: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "ash";
            tableName: "ingredient_addition_one";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        dextrin: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "dextrin";
            tableName: "ingredient_addition_one";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        glycerol: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "glycerol";
            tableName: "ingredient_addition_one";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        glycogen: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "glycogen";
            tableName: "ingredient_addition_one";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        inulin: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "inulin";
            tableName: "ingredient_addition_one";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        erythritol: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "erythritol";
            tableName: "ingredient_addition_one";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        maltitol: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "maltitol";
            tableName: "ingredient_addition_one";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        mannitol: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "mannitol";
            tableName: "ingredient_addition_one";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        xylitol: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "xylitol";
            tableName: "ingredient_addition_one";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        maltodextrin: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "maltodextrin";
            tableName: "ingredient_addition_one";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        oligosaccharides: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "oligosaccharides";
            tableName: "ingredient_addition_one";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        polydextrose: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "polydextrose";
            tableName: "ingredient_addition_one";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        raffinose: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "raffinose";
            tableName: "ingredient_addition_one";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        stachyose: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "stachyose";
            tableName: "ingredient_addition_one";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        sorbitol: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "sorbitol";
            tableName: "ingredient_addition_one";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
    };
    dialect: "sqlite";
}>;
declare const ingredientAdditionTwo: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "ingredient_addition_two";
    schema: undefined;
    columns: {
        id: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id";
            tableName: "ingredient_addition_two";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "created_at";
            tableName: "ingredient_addition_two";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updatedAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "updated_at";
            tableName: "ingredient_addition_two";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        ingredientId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "ingredient_id";
            tableName: "ingredient_addition_two";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        aceticAcid: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "acetic_acid";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        citricAcid: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "citric_acid";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        fumaricAcid: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "fumaric_acid";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        lacticAcid: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "lactic_acid";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        malicAcid: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "malic_acid";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        oxalicAcid: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "oxalic_acid";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        propionicAcid: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "propionic_acid";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        quinicAcid: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "quinic_acid";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        shikimicAcid: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "shikimic_acid";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        succinicAcid: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "succinic_acid";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        tartaricAcid: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "tartaric_acid";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        aluminium: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "aluminium";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        antimony: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "antimony";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        arsenic: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "arsenic";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        cadmium: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "cadmium";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        calcium: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "calcium";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        chromium: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "chromium";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        chloride: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "chloride";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        cobalt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "cobalt";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        copper: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "copper";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        fluoride: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "fluoride";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        iodine: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "iodine";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        iron: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "iron";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        lead: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "lead";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        magnesium: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "magnesium";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        manganese: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "manganese";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        mercury: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "mercury";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        molybdenum: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "molybdenum";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        nickel: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "nickel";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        phosphorus: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "phosphorus";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        potassium: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "potassium";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        selenium: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "selenium";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        sodium: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "sodium";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        sulphur: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "sulphur";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        tin: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "tin";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        zinc: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "zinc";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        retinol: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "retinol";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        alphaCarotene: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "alpha_carotene";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        betaCarotene: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "beta_carotene";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        cryptoxanthin: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "cryptoxanthin";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        betaCaroteneEquivalents: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "beta_carotene_equivalents";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        vitaminARetinolEquivalents: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "vitamin_a_retinol_equivalents";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        lutein: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "lutein";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        lycopene: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "lycopene";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        xanthophyl: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "xanthophyl";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        thiamin: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "thiamin";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        riboflavin: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "riboflavin";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        niacin: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "niacin";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        niacinDerivedFromTryptophan: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "niacin_derived_from_tryptophan";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        niacinDerivedEquivalents: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "niacin_derived_equivalents";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        pantothenicAcid: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "pantothenic_acid";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        pyridoxine: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "pyridoxine";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        biotin: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "biotin";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        cobalamin: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "cobalamin";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        folateNatural: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "folate_natural";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        folicAcid: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "folic_acid";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        totalFolates: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "total_folates";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        dietaryFolateEquivalents: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "dietary_folate_equivalents";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        vitaminC: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "vitamin_c";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        cholecalciferol: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "cholecalciferol";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        ergocalciferol: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "ergocalciferol";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        hydroxyCholecalciferol: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "hydroxy_cholecalciferol";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        hydroxyErgocalciferol: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "hydroxy_ergocalciferol";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        vitaminDEquivalents: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "vitamin_d_equivalents";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        alphaTocopherol: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "alpha_tocopherol";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        alphaTocotrienol: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "alpha_tocotrienol";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        betaTocopherol: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "beta_tocopherol";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        betaTocotrienol: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "beta_tocotrienol";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        deltaTocopherol: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "delta_tocopherol";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        deltaTocotrienol: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "delta_tocotrienol";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        gammaTocopherol: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "gamma_tocopherol";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        gammaTocotrienol: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "gamma_tocotrienol";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        vitaminE: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "vitamin_e";
            tableName: "ingredient_addition_two";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
    };
    dialect: "sqlite";
}>;
declare const ingredientAdditionThree: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "ingredient_addition_three";
    schema: undefined;
    columns: {
        id: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id";
            tableName: "ingredient_addition_three";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "created_at";
            tableName: "ingredient_addition_three";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updatedAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "updated_at";
            tableName: "ingredient_addition_three";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        ingredientId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "ingredient_id";
            tableName: "ingredient_addition_three";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        totalSaturatedFattyAcids: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "total_saturated_fatty_acids";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        totalMonounsaturatedFattyAcids: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "total_monounsaturated_fatty_acids";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        totalPolyunsaturatedFattyAcids: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "total_polyunsaturated_fatty_acids";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        totalLongChainOmega3FattyAcids: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "total_long_chain_omega_3_fatty_acids";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        totalTransFattyAcids: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "total_trans_fatty_acids";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        caffeine: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "caffeine";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        cholesterol: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "cholesterol";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        alanine: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "alanine";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        arginine: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "arginine";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        asparticAcid: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "aspartic_acid";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        cystinePlusCysteine: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "cystine_plus_cysteine";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        glutamicAcid: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "glutamic_acid";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        glycine: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "glycine";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        histidine: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "histidine";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        isoleucine: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "isoleucine";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        leucine: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "leucine";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        lysine: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "lysine";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        methionine: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "methionine";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        phenylalanine: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "phenylalanine";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        proline: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "proline";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        serine: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "serine";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        threonine: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "threonine";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        tyrosine: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "tyrosine";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        tryptophan: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "tryptophan";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        valine: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "valine";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c4: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c4";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c6: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c6";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c8: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c8";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c10: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c10";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c11: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c11";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c12: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c12";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c13: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c13";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c14: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c14";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c15: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c15";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c16: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c16";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c17: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c17";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c18: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c18";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c19: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c19";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c20: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c20";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c21: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c21";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c22: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c22";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c23: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c23";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c24: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c24";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        totalSaturatedFattyAcidsEquated: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "total_saturated_fatty_acids_equated";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c10_1: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c10_1";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c12_1: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c12_1";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c14_1: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c14_1";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c15_1: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c15_1";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c16_1: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c16_1";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c17_1: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c17_1";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c18_1: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c18_1";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c18_1w5: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c18_1w5";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c18_1w6: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c18_1w6";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c18_1w7: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c18_1w7";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c18_1w9: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c18_1w9";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c20_1: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c20_1";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c20_1w9: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c20_1w9";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c20_1w13: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c20_1w13";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c20_1w11: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c20_1w11";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c22_1: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c22_1";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c22_1w9: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c22_1w9";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c22_1w11: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c22_1w11";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c24_1: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c24_1";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c24_1w9: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c24_1w9";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c24_1w11: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c24_1w11";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c24_1w13: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c24_1w13";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        totalMonounsaturatedFattyAcidsEquated: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "total_monounsaturated_fatty_acids_equated";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c12_2: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c12_2";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c16_2w4: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c16_2w4";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c16_3: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c16_3";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c18_2w6: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c18_2w6";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c18_3w3: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c18_3w3";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c18_3w4: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c18_3w4";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c18_3w6: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c18_3w6";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c18_4w1: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c18_4w1";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c18_4w3: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c18_4w3";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c20_2: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c20_2";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c20_2w6: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c20_2w6";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c20_3: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c20_3";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c20_3w3: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c20_3w3";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c20_3w6: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c20_3w6";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c20_4: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c20_4";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c20_4w3: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c20_4w3";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c20_4w6: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c20_4w6";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c20_5w3: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c20_5w3";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c21_5w3: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c21_5w3";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c22_2: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c22_2";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c22_2w6: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c22_2w6";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c22_4w6: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c22_4w6";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c22_5w3: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c22_5w3";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c22_5w6: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c22_5w6";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        c22_6w3: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "c22_6w3";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        totalPolyunsaturatedFattyAcidsEquated: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "total_polyunsaturated_fatty_acids_equated";
            tableName: "ingredient_addition_three";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
    };
    dialect: "sqlite";
}>;
declare const groceryStore: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "grocery_store";
    schema: undefined;
    columns: {
        id: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id";
            tableName: "grocery_store";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "created_at";
            tableName: "grocery_store";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        name: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "name";
            tableName: "grocery_store";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        location: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "locations";
            tableName: "grocery_store";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
    };
    dialect: "sqlite";
}>;
declare const ingredientToGroceryStore: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "ingredient_to_grocery_store";
    schema: undefined;
    columns: {
        id: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id";
            tableName: "ingredient_to_grocery_store";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "created_at";
            tableName: "ingredient_to_grocery_store";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        ingredientId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "ingredient_id";
            tableName: "ingredient_to_grocery_store";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        groceryStoreId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "grocery_store_id";
            tableName: "ingredient_to_grocery_store";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "sqlite";
}>;
declare const groceryStoreRelations: drizzle_orm.Relations<"grocery_store", {
    ingredientToGroceryStore: drizzle_orm.Many<"ingredient_to_grocery_store">;
}>;
declare const ingredientToGroceryStoreRelations: drizzle_orm.Relations<"ingredient_to_grocery_store", {
    ingredient: drizzle_orm.One<"ingredient", false>;
    groceryStore: drizzle_orm.One<"grocery_store", false>;
}>;
declare const ingredientRelations: drizzle_orm.Relations<"ingredient", {
    user: drizzle_orm.One<"user", false>;
    recipeToIngredient: drizzle_orm.Many<"recipe_to_ingredient">;
    recipeToIngredientAlternate: drizzle_orm.Many<"recipe_to_ingredient">;
    userIngredient: drizzle_orm.Many<"user_ingredient">;
    userInhgredientAlternate: drizzle_orm.Many<"user_ingredient">;
    ingredientAdditionOne: drizzle_orm.One<"ingredient_addition_one", true>;
    ingredientAdditionTwo: drizzle_orm.One<"ingredient_addition_two", true>;
    ingredientAdditionThree: drizzle_orm.One<"ingredient_addition_three", true>;
    ingredientToGroceryStore: drizzle_orm.Many<"ingredient_to_grocery_store">;
    supplementStack: drizzle_orm.Many<"supplement_to_supplement_stack">;
    dailySupplements: drizzle_orm.Many<"daily_supplement">;
}>;
declare const ingredientAdditionOneRelations: drizzle_orm.Relations<"ingredient_addition_one", {
    ingredient: drizzle_orm.One<"ingredient", false>;
}>;
declare const ingredientAdditionTwoRelations: drizzle_orm.Relations<"ingredient_addition_two", {
    ingredient: drizzle_orm.One<"ingredient", false>;
}>;
declare const ingredientAdditionThreeRelations: drizzle_orm.Relations<"ingredient_addition_three", {
    ingredient: drizzle_orm.One<"ingredient", false>;
}>;

declare const settings: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "settings";
    schema: undefined;
    columns: {
        id: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id";
            tableName: "settings";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        isCaloriesWithFibre: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "is_calories_with_fibre";
            tableName: "settings";
            dataType: "boolean";
            columnType: "SQLiteBoolean";
            data: boolean;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "sqlite";
}>;

declare const recipe: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "recipe";
    schema: undefined;
    columns: {
        id: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id";
            tableName: "recipe";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "created_at";
            tableName: "recipe";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updatedAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "updated_at";
            tableName: "recipe";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        name: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "name";
            tableName: "recipe";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        description: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "description";
            tableName: "recipe";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        image: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "image";
            tableName: "recipe";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        notes: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "notes";
            tableName: "recipe";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        calories: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "calories";
            tableName: "recipe";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        creatorId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "creator_id";
            tableName: "recipe";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        isUserRecipe: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "is_user_recipe";
            tableName: "recipe";
            dataType: "boolean";
            columnType: "SQLiteBoolean";
            data: boolean;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        isGlobal: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "is_global";
            tableName: "recipe";
            dataType: "boolean";
            columnType: "SQLiteBoolean";
            data: boolean;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        recipeCategory: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "recipe_category";
            tableName: "recipe";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        favouriteAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "favourite_at";
            tableName: "recipe";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        deletedAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "deleted_at";
            tableName: "recipe";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        hiddenAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "hidden_at";
            tableName: "recipe";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "sqlite";
}>;
declare const recipeToIngredient: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "recipe_to_ingredient";
    schema: undefined;
    columns: {
        id: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id";
            tableName: "recipe_to_ingredient";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "created_at";
            tableName: "recipe_to_ingredient";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        recipeId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "recipe_id";
            tableName: "recipe_to_ingredient";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        ingredientId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "ingredient_id";
            tableName: "recipe_to_ingredient";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        index: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "index";
            tableName: "recipe_to_ingredient";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        alternateId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "alternate_id";
            tableName: "recipe_to_ingredient";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        serveSize: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "serve";
            tableName: "recipe_to_ingredient";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        serveUnit: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "serve_unit";
            tableName: "recipe_to_ingredient";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        note: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "note";
            tableName: "recipe_to_ingredient";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        isUserCreated: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "is_user_created";
            tableName: "recipe_to_ingredient";
            dataType: "boolean";
            columnType: "SQLiteBoolean";
            data: boolean;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "sqlite";
}>;
declare const recipeToIngredientRelations: drizzle_orm.Relations<"recipe_to_ingredient", {
    recipe: drizzle_orm.One<"recipe", true>;
    ingredient: drizzle_orm.One<"ingredient", true>;
    alternateIngredient: drizzle_orm.One<"ingredient", false>;
}>;
declare const recipeRelations: drizzle_orm.Relations<"recipe", {
    creator: drizzle_orm.One<"user", true>;
    recipeToIngredient: drizzle_orm.Many<"recipe_to_ingredient">;
}>;

declare const plan: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "plan";
    schema: undefined;
    columns: {
        id: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id";
            tableName: "plan";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "created_at";
            tableName: "plan";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updatedAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "updated_at";
            tableName: "plan";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        name: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "name";
            tableName: "plan";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        description: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "description";
            tableName: "plan";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        image: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "image";
            tableName: "plan";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        notes: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "notes";
            tableName: "plan";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        numberOfMeals: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "number_of_meals";
            tableName: "plan";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        creatorId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "creator_id";
            tableName: "plan";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        isGlobal: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "is_global";
            tableName: "plan";
            dataType: "boolean";
            columnType: "SQLiteBoolean";
            data: boolean;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        planCategory: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "recipe_category";
            tableName: "plan";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        favouriteAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "favourite_at";
            tableName: "plan";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        deletedAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "deleted_at";
            tableName: "plan";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        hiddenAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "hidden_at";
            tableName: "plan";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "sqlite";
}>;
declare const planToMeal: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "plan_to_meal";
    schema: undefined;
    columns: {
        id: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id";
            tableName: "plan_to_meal";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "created_at";
            tableName: "plan_to_meal";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        planId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "plan_id";
            tableName: "plan_to_meal";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        mealId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "meal_id";
            tableName: "plan_to_meal";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        mealIndex: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "index";
            tableName: "plan_to_meal";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        mealTitle: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "meal_title";
            tableName: "plan_to_meal";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        calories: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "calories";
            tableName: "plan_to_meal";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        vegeCalories: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "vege_calories";
            tableName: "plan_to_meal";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        note: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "note";
            tableName: "plan_to_meal";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
    };
    dialect: "sqlite";
}>;
declare const planRelations: drizzle_orm.Relations<"plan", {
    creator: drizzle_orm.One<"user", false>;
    planToMeal: drizzle_orm.Many<"plan_to_meal">;
    meals: drizzle_orm.Many<"meal">;
}>;
declare const planToMealRelations: drizzle_orm.Relations<"plan_to_meal", {
    meal: drizzle_orm.One<"meal", false>;
    plan: drizzle_orm.One<"plan", false>;
}>;

declare const meal: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "meal";
    schema: undefined;
    columns: {
        id: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id";
            tableName: "meal";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "created_at";
            tableName: "meal";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updatedAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "updated_at";
            tableName: "meal";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        planId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "plan_id";
            tableName: "meal";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        name: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "name";
            tableName: "meal";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        description: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "description";
            tableName: "meal";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        image: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "image";
            tableName: "meal";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        notes: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "notes";
            tableName: "meal";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        creatorId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "creator_id";
            tableName: "meal";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        mealCategory: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "meal_category";
            tableName: "meal";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        favouriteAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "favourite_at";
            tableName: "meal";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        deletedAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "deleted_at";
            tableName: "meal";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        hiddenAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "hidden_at";
            tableName: "meal";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        vegeNotes: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "vege_notes";
            tableName: "meal";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        vege: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "vege";
            tableName: "meal";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        vegeCalories: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "vege_calories";
            tableName: "meal";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        mealIndex: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "index";
            tableName: "meal";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        calories: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "calories";
            tableName: "meal";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
    };
    dialect: "sqlite";
}>;
declare const mealToRecipe: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "meal_to_recipe";
    schema: undefined;
    columns: {
        id: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id";
            tableName: "meal_to_recipe";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "created_at";
            tableName: "meal_to_recipe";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        mealId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "meal_id";
            tableName: "meal_to_recipe";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        recipeId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "recipe_id";
            tableName: "meal_to_recipe";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        index: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "index";
            tableName: "meal_to_recipe";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        note: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "note";
            tableName: "meal_to_recipe";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
    };
    dialect: "sqlite";
}>;
declare const vegeStack: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "vege_stack";
    schema: undefined;
    columns: {
        id: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id";
            tableName: "vege_stack";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "created_at";
            tableName: "vege_stack";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updatedAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "updated_at";
            tableName: "vege_stack";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        name: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "name";
            tableName: "vege_stack";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        veges: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "veges";
            tableName: "vege_stack";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        notes: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "notes";
            tableName: "vege_stack";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        calories: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "calories";
            tableName: "vege_stack";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
    };
    dialect: "sqlite";
}>;
declare const mealToVegeStack: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "meal_to_vege_stack";
    schema: undefined;
    columns: {
        id: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id";
            tableName: "meal_to_vege_stack";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "created_at";
            tableName: "meal_to_vege_stack";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        mealId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "meal_id";
            tableName: "meal_to_vege_stack";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        vegeStackId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "vege_stack_id";
            tableName: "meal_to_vege_stack";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        calories: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "calories";
            tableName: "meal_to_vege_stack";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        note: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "note";
            tableName: "meal_to_vege_stack";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
    };
    dialect: "sqlite";
}>;
declare const mealRelations: drizzle_orm.Relations<"meal", {
    creator: drizzle_orm.One<"user", false>;
    mealToRecipe: drizzle_orm.Many<"meal_to_recipe">;
    mealToVegeStack: drizzle_orm.Many<"meal_to_vege_stack">;
    planToMeal: drizzle_orm.Many<"plan_to_meal">;
    plan: drizzle_orm.One<"plan", false>;
}>;
declare const vegeStackRelations: drizzle_orm.Relations<"vege_stack", {
    mealToVegeStack: drizzle_orm.Many<"meal_to_vege_stack">;
}>;
declare const mealToVegeStackRelations: drizzle_orm.Relations<"meal_to_vege_stack", {
    meal: drizzle_orm.One<"meal", false>;
    vegeStack: drizzle_orm.One<"vege_stack", false>;
}>;
declare const mealToRecipeRelations: drizzle_orm.Relations<"meal_to_recipe", {
    meal: drizzle_orm.One<"meal", false>;
    recipe: drizzle_orm.One<"recipe", false>;
}>;

declare const userPlan: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "user_plan";
    schema: undefined;
    columns: {
        id: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id";
            tableName: "user_plan";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "created_at";
            tableName: "user_plan";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updatedAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "updated_at";
            tableName: "user_plan";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        finishedAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "finished_at";
            tableName: "user_plan";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        startAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "start_at";
            tableName: "user_plan";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        isActive: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "is_active";
            tableName: "user_plan";
            dataType: "boolean";
            columnType: "SQLiteBoolean";
            data: boolean;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        name: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "name";
            tableName: "user_plan";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        description: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "description";
            tableName: "user_plan";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        image: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "image";
            tableName: "user_plan";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        notes: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "notes";
            tableName: "user_plan";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        numberOfMeals: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "number_of_meals";
            tableName: "user_plan";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        creatorId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "creator_id";
            tableName: "user_plan";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        userId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "user_id";
            tableName: "user_plan";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        favouriteAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "favourite_at";
            tableName: "user_plan";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        deletedAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "deleted_at";
            tableName: "user_plan";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        hiddenAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "hidden_at";
            tableName: "user_plan";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "sqlite";
}>;
declare const userMeal: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "user_meal";
    schema: undefined;
    columns: {
        id: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id";
            tableName: "user_meal";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "created_at";
            tableName: "user_meal";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updatedAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "updated_at";
            tableName: "user_meal";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        userPlanId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "user_plan_id";
            tableName: "user_meal";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        mealIndex: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "index";
            tableName: "user_meal";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        mealTitle: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "meal_title";
            tableName: "user_meal";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        calories: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "calories";
            tableName: "user_meal";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        protein: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "protein";
            tableName: "user_meal";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        targetProtein: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "target_protein";
            tableName: "user_meal";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        targetCalories: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "target_calories";
            tableName: "user_meal";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        vegeCalories: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "vege_calories";
            tableName: "user_meal";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        veges: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "veges";
            tableName: "user_meal";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        vegeNotes: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "vege_notes";
            tableName: "user_meal";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        note: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "note";
            tableName: "user_meal";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
    };
    dialect: "sqlite";
}>;
declare const userRecipe: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "user_recipe";
    schema: undefined;
    columns: {
        id: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id";
            tableName: "user_recipe";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "created_at";
            tableName: "user_recipe";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updatedAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "updated_at";
            tableName: "user_recipe";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        mealIndex: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "meal_index";
            tableName: "user_recipe";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        recipeIndex: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "recipe_index";
            tableName: "user_recipe";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        userPlanId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "user_plan_id";
            tableName: "user_recipe";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        dailyMealId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "daily_meal_id";
            tableName: "user_recipe";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        parentId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "parent_id";
            tableName: "user_recipe";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        name: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "name";
            tableName: "user_recipe";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        index: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "index";
            tableName: "user_recipe";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        serve: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "serve";
            tableName: "user_recipe";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        serveUnit: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "serve_unit";
            tableName: "user_recipe";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        note: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "note";
            tableName: "user_recipe";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        isLog: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "is_log";
            tableName: "user_recipe";
            dataType: "boolean";
            columnType: "SQLiteBoolean";
            data: boolean;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        dailyLogId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "daily_log_id";
            tableName: "user_recipe";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        isUserCreated: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "is_user_created";
            tableName: "user_recipe";
            dataType: "boolean";
            columnType: "SQLiteBoolean";
            data: boolean;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "sqlite";
}>;
declare const userIngredient: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "user_ingredient";
    schema: undefined;
    columns: {
        id: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id";
            tableName: "user_ingredient";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "created_at";
            tableName: "user_ingredient";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updatedAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "updated_at";
            tableName: "user_ingredient";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        ingredientId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "ingredient_id";
            tableName: "user_ingredient";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        userPlanId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "user_plan_id";
            tableName: "user_ingredient";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        dailyMealId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "daily_meal_id";
            tableName: "user_ingredient";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        name: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "name";
            tableName: "user_ingredient";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        mealIndex: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "meal_index";
            tableName: "user_ingredient";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        recipeIndex: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "recipe_index";
            tableName: "user_ingredient";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        alternateId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "alternate_id";
            tableName: "user_ingredient";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        serve: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "serve";
            tableName: "user_ingredient";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        serveUnit: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "serve_unit";
            tableName: "user_ingredient";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        note: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "note";
            tableName: "user_ingredient";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        dailyLogId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "daily_log_id";
            tableName: "user_ingredient";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        isUserCreated: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "is_user_created";
            tableName: "user_ingredient";
            dataType: "boolean";
            columnType: "SQLiteBoolean";
            data: boolean;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "sqlite";
}>;
declare const userPlanRelations: drizzle_orm.Relations<"user_plan", {
    user: drizzle_orm.One<"user", true>;
    creator: drizzle_orm.One<"user", true>;
    userMeals: drizzle_orm.Many<"user_meal">;
    userRecipes: drizzle_orm.Many<"user_recipe">;
    userIngredients: drizzle_orm.Many<"user_ingredient">;
}>;
declare const userMealRelations: drizzle_orm.Relations<"user_meal", {
    userPlan: drizzle_orm.One<"user_plan", true>;
}>;
declare const userRecipeRelations: drizzle_orm.Relations<"user_recipe", {
    userPlan: drizzle_orm.One<"user_plan", false>;
    dailyMeal: drizzle_orm.One<"daily_meal", false>;
}>;
declare const userIngredientRelations: drizzle_orm.Relations<"user_ingredient", {
    ingredient: drizzle_orm.One<"ingredient", false>;
    alternateIngredient: drizzle_orm.One<"ingredient", false>;
    userPlan: drizzle_orm.One<"user_plan", false>;
    dailyMeal: drizzle_orm.One<"daily_meal", false>;
}>;

declare const log: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "log";
    schema: undefined;
    columns: {
        id: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id";
            tableName: "log";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "created_at";
            tableName: "log";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        objectId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "object_id";
            tableName: "log";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        task: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "task";
            tableName: "log";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        notes: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "notes";
            tableName: "log";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        user: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "user";
            tableName: "log";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        userId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "user_id";
            tableName: "log";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
    };
    dialect: "sqlite";
}>;
declare const logNew: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "log_new";
    schema: undefined;
    columns: {
        id: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id";
            tableName: "log_new";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "created_at";
            tableName: "log_new";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        input: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "input";
            tableName: "log_new";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        type: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "type";
            tableName: "log_new";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        path: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "path";
            tableName: "log_new";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        duration: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "duration";
            tableName: "log_new";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        source: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "source";
            tableName: "log_new";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        info: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "info";
            tableName: "log_new";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        error: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "error";
            tableName: "log_new";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        user: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "user";
            tableName: "log_new";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        userId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "user_id";
            tableName: "log_new";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
    };
    dialect: "sqlite";
}>;

declare const message: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "message";
    schema: undefined;
    columns: {
        id: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id";
            tableName: "message";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "created_at";
            tableName: "message";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        userId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "user_id";
            tableName: "message";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        subject: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "subject";
            tableName: "message";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        isImportant: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "is_important";
            tableName: "message";
            dataType: "boolean";
            columnType: "SQLiteBoolean";
            data: boolean;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        isRead: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "is_read";
            tableName: "message";
            dataType: "boolean";
            columnType: "SQLiteBoolean";
            data: boolean;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        isViewed: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "is_viewed";
            tableName: "message";
            dataType: "boolean";
            columnType: "SQLiteBoolean";
            data: boolean;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        isDeleted: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "is_deleted";
            tableName: "message";
            dataType: "boolean";
            columnType: "SQLiteBoolean";
            data: boolean;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        message: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "message";
            tableName: "message";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        image: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "image";
            tableName: "message";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        fromUserId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "from_user_id";
            tableName: "message";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
    };
    dialect: "sqlite";
}>;
declare const messageRelations: drizzle_orm.Relations<"message", {
    user: drizzle_orm.One<"user", false>;
    fromUser: drizzle_orm.One<"user", false>;
}>;

declare const skinfold: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "skinfold";
    schema: undefined;
    columns: {
        id: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id";
            tableName: "skinfold";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "created_at";
            tableName: "skinfold";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        userId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "user_id";
            tableName: "skinfold";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        creatorId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "creator_id";
            tableName: "skinfold";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        date: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "date";
            tableName: "skinfold";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        chin: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "chin";
            tableName: "skinfold";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        cheek: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "cheek";
            tableName: "skinfold";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        lowerAbdominal: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "lower_abdominal";
            tableName: "skinfold";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        pectoral: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "pectoral";
            tableName: "skinfold";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        biceps: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "biceps";
            tableName: "skinfold";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        triceps: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "triceps";
            tableName: "skinfold";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        subscapular: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "subscapular";
            tableName: "skinfold";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        midAxillary: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "mid_axillary";
            tableName: "skinfold";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        suprailiac: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "suprailiac";
            tableName: "skinfold";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        umbilical: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "umbilical";
            tableName: "skinfold";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        lowerBack: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "lower_back";
            tableName: "skinfold";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        quadriceps: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "quadriceps";
            tableName: "skinfold";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        hamstrings: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "hamstrings";
            tableName: "skinfold";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        medialCalf: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "medial_calf";
            tableName: "skinfold";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        knee: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "knee";
            tableName: "skinfold";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        shoulder: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "shoulder";
            tableName: "skinfold";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        notes: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "notes";
            tableName: "skinfold";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        formula: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "formula";
            tableName: "skinfold";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        test: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "test";
            tableName: "skinfold";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
    };
    dialect: "sqlite";
}>;
declare const girthMeasurement: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "girth_measurement";
    schema: undefined;
    columns: {
        id: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id";
            tableName: "girth_measurement";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "created_at";
            tableName: "girth_measurement";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        userId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "user_id";
            tableName: "girth_measurement";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        date: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "date";
            tableName: "girth_measurement";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        waist: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "waist";
            tableName: "girth_measurement";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        glutePeak: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "glute_peaks";
            tableName: "girth_measurement";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        bicep: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "bicep";
            tableName: "girth_measurement";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        cheastPeak: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "chest_peak";
            tableName: "girth_measurement";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        thighPeak: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "thigh_peak";
            tableName: "girth_measurement";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        calfPeak: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "calf_peak";
            tableName: "girth_measurement";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        frontRelaxedImage: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "front_relaxed_image";
            tableName: "girth_measurement";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        frontPosedImage: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "front_posed_image";
            tableName: "girth_measurement";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        sideRelaxedImage: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "side_relaxed_image";
            tableName: "girth_measurement";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        sidePosedImage: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "side_posed_image";
            tableName: "girth_measurement";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        backRelaxedImage: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "back_relaxed_image";
            tableName: "girth_measurement";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        backPosedImage: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "back_posed_image";
            tableName: "girth_measurement";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        gluteRelaxedImage: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "glute_relaxed_image";
            tableName: "girth_measurement";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        glutePosedImage: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "glute_posed_image";
            tableName: "girth_measurement";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        isDailyLog: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "is_daily_log";
            tableName: "girth_measurement";
            dataType: "boolean";
            columnType: "SQLiteBoolean";
            data: boolean;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "sqlite";
}>;
declare const images: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "images";
    schema: undefined;
    columns: {
        id: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id";
            tableName: "images";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "created_at";
            tableName: "images";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        userId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "user_id";
            tableName: "images";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        name: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "name";
            tableName: "images";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        date: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "date";
            tableName: "images";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        image: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "image";
            tableName: "images";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
    };
    dialect: "sqlite";
}>;
declare const imagesRelations: drizzle_orm.Relations<"images", {
    user: drizzle_orm.One<"user", true>;
}>;
declare const girthMeasurementRelations: drizzle_orm.Relations<"girth_measurement", {
    user: drizzle_orm.One<"user", true>;
}>;
declare const skinfoldRelations: drizzle_orm.Relations<"skinfold", {
    user: drizzle_orm.One<"user", true>;
    creator: drizzle_orm.One<"user", false>;
    bodyFat: drizzle_orm.Many<"body_fat">;
    leanMass: drizzle_orm.Many<"lean_mass">;
    bodyWeight: drizzle_orm.Many<"body_weight">;
}>;
declare const bodyFat: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "body_fat";
    schema: undefined;
    columns: {
        id: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id";
            tableName: "body_fat";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "created_at";
            tableName: "body_fat";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        userId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "user_id";
            tableName: "body_fat";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        date: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "date";
            tableName: "body_fat";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        bodyFat: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "body_fat";
            tableName: "body_fat";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        notes: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "notes";
            tableName: "body_fat";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        formula: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "formula";
            tableName: "body_fat";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        skinfoldId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "skinfold_id";
            tableName: "body_fat";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "sqlite";
}>;
declare const bodyFatRelations: drizzle_orm.Relations<"body_fat", {
    user: drizzle_orm.One<"user", true>;
    skinfold: drizzle_orm.One<"skinfold", false>;
}>;
declare const leanMass: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "lean_mass";
    schema: undefined;
    columns: {
        id: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id";
            tableName: "lean_mass";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "created_at";
            tableName: "lean_mass";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        userId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "user_id";
            tableName: "lean_mass";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        date: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "date";
            tableName: "lean_mass";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        leanMass: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "lean_mass";
            tableName: "lean_mass";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        notes: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "notes";
            tableName: "lean_mass";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        formula: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "formula";
            tableName: "lean_mass";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        skinfoldId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "skinfold_id";
            tableName: "lean_mass";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "sqlite";
}>;
declare const leanMassRelations: drizzle_orm.Relations<"lean_mass", {
    user: drizzle_orm.One<"user", true>;
    skinfold: drizzle_orm.One<"skinfold", false>;
}>;
declare const bodyWeight: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "body_weight";
    schema: undefined;
    columns: {
        id: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id";
            tableName: "body_weight";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "created_at";
            tableName: "body_weight";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        userId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "user_id";
            tableName: "body_weight";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        date: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "date";
            tableName: "body_weight";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        bodyWeight: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "body_weight";
            tableName: "body_weight";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        source: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "source";
            tableName: "body_weight";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        notes: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "notes";
            tableName: "body_weight";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        skinfoldId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "skinfold_id";
            tableName: "body_weight";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "sqlite";
}>;
declare const bodyWeightRelations: drizzle_orm.Relations<"body_weight", {
    user: drizzle_orm.One<"user", true>;
    skinfold: drizzle_orm.One<"skinfold", false>;
}>;

declare const dailyLog: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "daily_log";
    schema: undefined;
    columns: {
        id: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id";
            tableName: "daily_log";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "created_at";
            tableName: "daily_log";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updatedAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "updated_at";
            tableName: "daily_log";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        userId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "user_id";
            tableName: "daily_log";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        date: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "date";
            tableName: "daily_log";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        morningWeight: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "morning_weight";
            tableName: "daily_log";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        notes: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "notes";
            tableName: "daily_log";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        fastedBloodGlucose: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "fasted_blood_glucose";
            tableName: "daily_log";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        sleep: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "sleep";
            tableName: "daily_log";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        sleepQuality: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "sleep_quality";
            tableName: "daily_log";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        isHiit: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "is_hiit";
            tableName: "daily_log";
            dataType: "boolean";
            columnType: "SQLiteBoolean";
            data: boolean;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        isCardio: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "is_cardio";
            tableName: "daily_log";
            dataType: "boolean";
            columnType: "SQLiteBoolean";
            data: boolean;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        isLift: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "is_lift";
            tableName: "daily_log";
            dataType: "boolean";
            columnType: "SQLiteBoolean";
            data: boolean;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        isLiss: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "is_liss";
            tableName: "daily_log";
            dataType: "boolean";
            columnType: "SQLiteBoolean";
            data: boolean;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        isStarred: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "is_starred";
            tableName: "daily_log";
            dataType: "boolean";
            columnType: "SQLiteBoolean";
            data: boolean;
            driverParam: number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        hiit: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "hiit";
            tableName: "daily_log";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        cardio: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "cardio";
            tableName: "daily_log";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        weight: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "weight";
            tableName: "daily_log";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        liss: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "liss";
            tableName: "daily_log";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        posing: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "posing";
            tableName: "daily_log";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        steps: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "steps";
            tableName: "daily_log";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        sauna: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "sauna";
            tableName: "daily_log";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        coldPlunge: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "cold_plunge";
            tableName: "daily_log";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        cardioType: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "cardio_type";
            tableName: "daily_log";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        image: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "image";
            tableName: "daily_log";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        frontImage: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "front_image";
            tableName: "daily_log";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        sideImage: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "side_image";
            tableName: "daily_log";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        backImage: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "back_image";
            tableName: "daily_log";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        frontPoseImage: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "front_pose_image";
            tableName: "daily_log";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        sidePoseImage: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "side_pose_image";
            tableName: "daily_log";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        backPoseImage: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "back_pose_image";
            tableName: "daily_log";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        spareImageOne: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "spare_image";
            tableName: "daily_log";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        spareImageTwo: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "spare_image";
            tableName: "daily_log";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        waistMeasurement: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "waist_measurement";
            tableName: "daily_log";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        nap: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "nap";
            tableName: "daily_log";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
    };
    dialect: "sqlite";
}>;
declare const dailyLogRelations: drizzle_orm.Relations<"daily_log", {
    user: drizzle_orm.One<"user", true>;
    dailyMeals: drizzle_orm.Many<"daily_meal">;
    waterLogs: drizzle_orm.Many<"water_log">;
    poopLogs: drizzle_orm.Many<"poop_log">;
    tags: drizzle_orm.Many<"tag_to_daily_log">;
    supplements: drizzle_orm.Many<"daily_supplement">;
}>;
declare const dailySupplement: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "daily_supplement";
    schema: undefined;
    columns: {
        id: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id";
            tableName: "daily_supplement";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "created_at";
            tableName: "daily_supplement";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        dailyLogId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "daily_log_id";
            tableName: "daily_supplement";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        supplementId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "supplement_id";
            tableName: "daily_supplement";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        amount: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "amount";
            tableName: "daily_supplement";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        unit: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "unit";
            tableName: "daily_supplement";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        time: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "time";
            tableName: "daily_supplement";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        notes: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "notes";
            tableName: "daily_supplement";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
    };
    dialect: "sqlite";
}>;
declare const dailySupplementRelations: drizzle_orm.Relations<"daily_supplement", {
    dailyLog: drizzle_orm.One<"daily_log", true>;
    supplement: drizzle_orm.One<"ingredient", true>;
}>;
declare const tag: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "tag";
    schema: undefined;
    columns: {
        id: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id";
            tableName: "tag";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "created_at";
            tableName: "tag";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        name: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "name";
            tableName: "tag";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        icon: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "icon";
            tableName: "tag";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        color: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "color";
            tableName: "tag";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        userId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "user_id";
            tableName: "tag";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
    };
    dialect: "sqlite";
}>;
declare const tagRelations: drizzle_orm.Relations<"tag", {
    user: drizzle_orm.One<"user", true>;
    dailyLogs: drizzle_orm.Many<"tag_to_daily_log">;
}>;
declare const tagToDailyLog: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "tag_to_daily_log";
    schema: undefined;
    columns: {
        id: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id";
            tableName: "tag_to_daily_log";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        tagId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "tag_id";
            tableName: "tag_to_daily_log";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        dailyLogId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "daily_log_id";
            tableName: "tag_to_daily_log";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "sqlite";
}>;
declare const tagToDailyLogRelations: drizzle_orm.Relations<"tag_to_daily_log", {
    tag: drizzle_orm.One<"tag", true>;
    dailyLog: drizzle_orm.One<"daily_log", true>;
}>;
declare const poopLog: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "poop_log";
    schema: undefined;
    columns: {
        id: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id";
            tableName: "poop_log";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "created_at";
            tableName: "poop_log";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        dailyLogId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "daily_log_id";
            tableName: "poop_log";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "sqlite";
}>;
declare const poopLogRelations: drizzle_orm.Relations<"poop_log", {
    dailyLog: drizzle_orm.One<"daily_log", true>;
}>;
declare const waterLog: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "water_log";
    schema: undefined;
    columns: {
        id: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id";
            tableName: "water_log";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "created_at";
            tableName: "water_log";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        dailyLogId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "daily_log_id";
            tableName: "water_log";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        amount: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "water";
            tableName: "water_log";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
    };
    dialect: "sqlite";
}>;
declare const waterLogRelations: drizzle_orm.Relations<"water_log", {
    dailyLog: drizzle_orm.One<"daily_log", true>;
}>;
declare const dailyMeal: drizzle_orm_sqlite_core.SQLiteTableWithColumns<{
    name: "daily_meal";
    schema: undefined;
    columns: {
        id: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "id";
            tableName: "daily_meal";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "created_at";
            tableName: "daily_meal";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        dailyLogId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "daily_log_id";
            tableName: "daily_meal";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        mealIndex: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "meal_index";
            tableName: "daily_meal";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        date: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "date";
            tableName: "daily_meal";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        recipeId: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "recipe_id";
            tableName: "daily_meal";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
            driverParam: number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        vegeCalories: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "vege_calories";
            tableName: "daily_meal";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        veges: drizzle_orm_sqlite_core.SQLiteColumn<{
            name: "veges";
            tableName: "daily_meal";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
    };
    dialect: "sqlite";
}>;
declare const dailyMealRelations: drizzle_orm.Relations<"daily_meal", {
    dailyLog: drizzle_orm.One<"daily_log", true>;
    recipe: drizzle_orm.Many<"user_recipe">;
    ingredients: drizzle_orm.Many<"user_ingredient">;
}>;

declare const ______db_schema_account: typeof account;
declare const ______db_schema_accountsRelations: typeof accountsRelations;
declare const ______db_schema_bodyFat: typeof bodyFat;
declare const ______db_schema_bodyFatRelations: typeof bodyFatRelations;
declare const ______db_schema_bodyWeight: typeof bodyWeight;
declare const ______db_schema_bodyWeightRelations: typeof bodyWeightRelations;
declare const ______db_schema_dailyLog: typeof dailyLog;
declare const ______db_schema_dailyLogRelations: typeof dailyLogRelations;
declare const ______db_schema_dailyMeal: typeof dailyMeal;
declare const ______db_schema_dailyMealRelations: typeof dailyMealRelations;
declare const ______db_schema_dailySupplement: typeof dailySupplement;
declare const ______db_schema_dailySupplementRelations: typeof dailySupplementRelations;
declare const ______db_schema_girthMeasurement: typeof girthMeasurement;
declare const ______db_schema_girthMeasurementRelations: typeof girthMeasurementRelations;
declare const ______db_schema_goals: typeof goals;
declare const ______db_schema_goalsRelations: typeof goalsRelations;
declare const ______db_schema_groceryStore: typeof groceryStore;
declare const ______db_schema_groceryStoreRelations: typeof groceryStoreRelations;
declare const ______db_schema_images: typeof images;
declare const ______db_schema_imagesRelations: typeof imagesRelations;
declare const ______db_schema_ingredient: typeof ingredient;
declare const ______db_schema_ingredientAdditionOne: typeof ingredientAdditionOne;
declare const ______db_schema_ingredientAdditionOneRelations: typeof ingredientAdditionOneRelations;
declare const ______db_schema_ingredientAdditionThree: typeof ingredientAdditionThree;
declare const ______db_schema_ingredientAdditionThreeRelations: typeof ingredientAdditionThreeRelations;
declare const ______db_schema_ingredientAdditionTwo: typeof ingredientAdditionTwo;
declare const ______db_schema_ingredientAdditionTwoRelations: typeof ingredientAdditionTwoRelations;
declare const ______db_schema_ingredientRelations: typeof ingredientRelations;
declare const ______db_schema_ingredientToGroceryStore: typeof ingredientToGroceryStore;
declare const ______db_schema_ingredientToGroceryStoreRelations: typeof ingredientToGroceryStoreRelations;
declare const ______db_schema_leanMass: typeof leanMass;
declare const ______db_schema_leanMassRelations: typeof leanMassRelations;
declare const ______db_schema_log: typeof log;
declare const ______db_schema_logNew: typeof logNew;
declare const ______db_schema_meal: typeof meal;
declare const ______db_schema_mealRelations: typeof mealRelations;
declare const ______db_schema_mealToRecipe: typeof mealToRecipe;
declare const ______db_schema_mealToRecipeRelations: typeof mealToRecipeRelations;
declare const ______db_schema_mealToVegeStack: typeof mealToVegeStack;
declare const ______db_schema_mealToVegeStackRelations: typeof mealToVegeStackRelations;
declare const ______db_schema_message: typeof message;
declare const ______db_schema_messageRelations: typeof messageRelations;
declare const ______db_schema_notification: typeof notification;
declare const ______db_schema_notificationRelations: typeof notificationRelations;
declare const ______db_schema_notificationToggle: typeof notificationToggle;
declare const ______db_schema_notificationToggleRelations: typeof notificationToggleRelations;
declare const ______db_schema_plan: typeof plan;
declare const ______db_schema_planRelations: typeof planRelations;
declare const ______db_schema_planToMeal: typeof planToMeal;
declare const ______db_schema_planToMealRelations: typeof planToMealRelations;
declare const ______db_schema_poopLog: typeof poopLog;
declare const ______db_schema_poopLogRelations: typeof poopLogRelations;
declare const ______db_schema_recipe: typeof recipe;
declare const ______db_schema_recipeRelations: typeof recipeRelations;
declare const ______db_schema_recipeToIngredient: typeof recipeToIngredient;
declare const ______db_schema_recipeToIngredientRelations: typeof recipeToIngredientRelations;
declare const ______db_schema_role: typeof role;
declare const ______db_schema_roleRelations: typeof roleRelations;
declare const ______db_schema_session: typeof session;
declare const ______db_schema_sessionsRelations: typeof sessionsRelations;
declare const ______db_schema_settings: typeof settings;
declare const ______db_schema_skinfold: typeof skinfold;
declare const ______db_schema_skinfoldRelations: typeof skinfoldRelations;
declare const ______db_schema_supplementStack: typeof supplementStack;
declare const ______db_schema_supplementStackRelations: typeof supplementStackRelations;
declare const ______db_schema_supplementToSupplementStack: typeof supplementToSupplementStack;
declare const ______db_schema_supplementToSupplementStackRelations: typeof supplementToSupplementStackRelations;
declare const ______db_schema_tag: typeof tag;
declare const ______db_schema_tagRelations: typeof tagRelations;
declare const ______db_schema_tagToDailyLog: typeof tagToDailyLog;
declare const ______db_schema_tagToDailyLogRelations: typeof tagToDailyLogRelations;
declare const ______db_schema_trainerNotes: typeof trainerNotes;
declare const ______db_schema_trainerNotesRelations: typeof trainerNotesRelations;
declare const ______db_schema_user: typeof user;
declare const ______db_schema_userCategory: typeof userCategory;
declare const ______db_schema_userCategoryRelations: typeof userCategoryRelations;
declare const ______db_schema_userIngredient: typeof userIngredient;
declare const ______db_schema_userIngredientRelations: typeof userIngredientRelations;
declare const ______db_schema_userMeal: typeof userMeal;
declare const ______db_schema_userMealRelations: typeof userMealRelations;
declare const ______db_schema_userPlan: typeof userPlan;
declare const ______db_schema_userPlanRelations: typeof userPlanRelations;
declare const ______db_schema_userRecipe: typeof userRecipe;
declare const ______db_schema_userRecipeRelations: typeof userRecipeRelations;
declare const ______db_schema_userRelations: typeof userRelations;
declare const ______db_schema_userSettings: typeof userSettings;
declare const ______db_schema_userSettingsRelations: typeof userSettingsRelations;
declare const ______db_schema_userToTrainer: typeof userToTrainer;
declare const ______db_schema_userToTrainerRelations: typeof userToTrainerRelations;
declare const ______db_schema_userToUserCategory: typeof userToUserCategory;
declare const ______db_schema_usertoUserCategoryRelations: typeof usertoUserCategoryRelations;
declare const ______db_schema_vegeStack: typeof vegeStack;
declare const ______db_schema_vegeStackRelations: typeof vegeStackRelations;
declare const ______db_schema_verificationToken: typeof verificationToken;
declare const ______db_schema_waterLog: typeof waterLog;
declare const ______db_schema_waterLogRelations: typeof waterLogRelations;
declare const ______db_schema_weighIn: typeof weighIn;
declare const ______db_schema_weighInRelations: typeof weighInRelations;
declare namespace ______db_schema {
  export { ______db_schema_account as account, ______db_schema_accountsRelations as accountsRelations, ______db_schema_bodyFat as bodyFat, ______db_schema_bodyFatRelations as bodyFatRelations, ______db_schema_bodyWeight as bodyWeight, ______db_schema_bodyWeightRelations as bodyWeightRelations, ______db_schema_dailyLog as dailyLog, ______db_schema_dailyLogRelations as dailyLogRelations, ______db_schema_dailyMeal as dailyMeal, ______db_schema_dailyMealRelations as dailyMealRelations, ______db_schema_dailySupplement as dailySupplement, ______db_schema_dailySupplementRelations as dailySupplementRelations, ______db_schema_girthMeasurement as girthMeasurement, ______db_schema_girthMeasurementRelations as girthMeasurementRelations, ______db_schema_goals as goals, ______db_schema_goalsRelations as goalsRelations, ______db_schema_groceryStore as groceryStore, ______db_schema_groceryStoreRelations as groceryStoreRelations, ______db_schema_images as images, ______db_schema_imagesRelations as imagesRelations, ______db_schema_ingredient as ingredient, ______db_schema_ingredientAdditionOne as ingredientAdditionOne, ______db_schema_ingredientAdditionOneRelations as ingredientAdditionOneRelations, ______db_schema_ingredientAdditionThree as ingredientAdditionThree, ______db_schema_ingredientAdditionThreeRelations as ingredientAdditionThreeRelations, ______db_schema_ingredientAdditionTwo as ingredientAdditionTwo, ______db_schema_ingredientAdditionTwoRelations as ingredientAdditionTwoRelations, ______db_schema_ingredientRelations as ingredientRelations, ______db_schema_ingredientToGroceryStore as ingredientToGroceryStore, ______db_schema_ingredientToGroceryStoreRelations as ingredientToGroceryStoreRelations, ______db_schema_leanMass as leanMass, ______db_schema_leanMassRelations as leanMassRelations, ______db_schema_log as log, ______db_schema_logNew as logNew, ______db_schema_meal as meal, ______db_schema_mealRelations as mealRelations, ______db_schema_mealToRecipe as mealToRecipe, ______db_schema_mealToRecipeRelations as mealToRecipeRelations, ______db_schema_mealToVegeStack as mealToVegeStack, ______db_schema_mealToVegeStackRelations as mealToVegeStackRelations, ______db_schema_message as message, ______db_schema_messageRelations as messageRelations, ______db_schema_notification as notification, ______db_schema_notificationRelations as notificationRelations, ______db_schema_notificationToggle as notificationToggle, ______db_schema_notificationToggleRelations as notificationToggleRelations, ______db_schema_plan as plan, ______db_schema_planRelations as planRelations, ______db_schema_planToMeal as planToMeal, ______db_schema_planToMealRelations as planToMealRelations, ______db_schema_poopLog as poopLog, ______db_schema_poopLogRelations as poopLogRelations, ______db_schema_recipe as recipe, ______db_schema_recipeRelations as recipeRelations, ______db_schema_recipeToIngredient as recipeToIngredient, ______db_schema_recipeToIngredientRelations as recipeToIngredientRelations, ______db_schema_role as role, ______db_schema_roleRelations as roleRelations, ______db_schema_session as session, ______db_schema_sessionsRelations as sessionsRelations, ______db_schema_settings as settings, ______db_schema_skinfold as skinfold, ______db_schema_skinfoldRelations as skinfoldRelations, ______db_schema_supplementStack as supplementStack, ______db_schema_supplementStackRelations as supplementStackRelations, ______db_schema_supplementToSupplementStack as supplementToSupplementStack, ______db_schema_supplementToSupplementStackRelations as supplementToSupplementStackRelations, ______db_schema_tag as tag, ______db_schema_tagRelations as tagRelations, ______db_schema_tagToDailyLog as tagToDailyLog, ______db_schema_tagToDailyLogRelations as tagToDailyLogRelations, ______db_schema_trainerNotes as trainerNotes, ______db_schema_trainerNotesRelations as trainerNotesRelations, ______db_schema_user as user, ______db_schema_userCategory as userCategory, ______db_schema_userCategoryRelations as userCategoryRelations, ______db_schema_userIngredient as userIngredient, ______db_schema_userIngredientRelations as userIngredientRelations, ______db_schema_userMeal as userMeal, ______db_schema_userMealRelations as userMealRelations, ______db_schema_userPlan as userPlan, ______db_schema_userPlanRelations as userPlanRelations, ______db_schema_userRecipe as userRecipe, ______db_schema_userRecipeRelations as userRecipeRelations, ______db_schema_userRelations as userRelations, ______db_schema_userSettings as userSettings, ______db_schema_userSettingsRelations as userSettingsRelations, ______db_schema_userToTrainer as userToTrainer, ______db_schema_userToTrainerRelations as userToTrainerRelations, ______db_schema_userToUserCategory as userToUserCategory, ______db_schema_usertoUserCategoryRelations as usertoUserCategoryRelations, ______db_schema_vegeStack as vegeStack, ______db_schema_vegeStackRelations as vegeStackRelations, ______db_schema_verificationToken as verificationToken, ______db_schema_waterLog as waterLog, ______db_schema_waterLogRelations as waterLogRelations, ______db_schema_weighIn as weighIn, ______db_schema_weighInRelations as weighInRelations };
}

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
declare const appRouter: _trpc_server.TRPCBuiltRouter<{
    ctx: {
        headers: Headers;
        db: drizzle_orm_libsql.LibSQLDatabase<typeof ______db_schema> & {
            $client: _libsql_client.Client;
        };
        session: next_auth.Session | null;
    };
    meta: object;
    errorShape: {
        data: {
            zodError: zod.ZodFlattenedError<unknown, string> | null;
            code: _trpc_server.TRPC_ERROR_CODE_KEY;
            httpStatus: number;
            path?: string;
            stack?: string;
        };
        message: string;
        code: _trpc_server.TRPC_ERROR_CODE_NUMBER;
    };
    transformer: true;
}, _trpc_server.TRPCDecorateCreateRouterOptions<{
    goal: _trpc_server.TRPCBuiltRouter<{
        ctx: {
            headers: Headers;
            db: drizzle_orm_libsql.LibSQLDatabase<typeof ______db_schema> & {
                $client: _libsql_client.Client;
            };
            session: next_auth.Session | null;
        };
        meta: object;
        errorShape: {
            data: {
                zodError: zod.ZodFlattenedError<unknown, string> | null;
                code: _trpc_server.TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: _trpc_server.TRPC_ERROR_CODE_NUMBER;
        };
        transformer: true;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        create: _trpc_server.TRPCMutationProcedure<{
            input: {
                userId: string;
                title: string;
                description: string;
                state: string;
            };
            output: {
                id: number;
            }[];
            meta: object;
        }>;
        update: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
                title: string;
                description: string;
                state: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        delete: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        getUser: _trpc_server.TRPCQueryProcedure<{
            input: {
                userId: string;
            };
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date | null;
                description: string | null;
                userId: string;
                title: string | null;
                trainerId: string;
                state: string | null;
                completedAt: Date | null;
            }[];
            meta: object;
        }>;
        get: _trpc_server.TRPCQueryProcedure<{
            input: {
                id: number;
            };
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date | null;
                description: string | null;
                userId: string;
                title: string | null;
                trainerId: string;
                state: string | null;
                completedAt: Date | null;
            } | undefined;
            meta: object;
        }>;
    }>>;
    tag: _trpc_server.TRPCBuiltRouter<{
        ctx: {
            headers: Headers;
            db: drizzle_orm_libsql.LibSQLDatabase<typeof ______db_schema> & {
                $client: _libsql_client.Client;
            };
            session: next_auth.Session | null;
        };
        meta: object;
        errorShape: {
            data: {
                zodError: zod.ZodFlattenedError<unknown, string> | null;
                code: _trpc_server.TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: _trpc_server.TRPC_ERROR_CODE_NUMBER;
        };
        transformer: true;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        getAllTagsCurrentUser: _trpc_server.TRPCQueryProcedure<{
            input: void;
            output: {
                id: number;
                name: string;
                createdAt: Date;
                userId: string;
                icon: string;
                color: string;
            }[];
            meta: object;
        }>;
        create: _trpc_server.TRPCMutationProcedure<{
            input: {
                name: string;
                color: string;
                icon: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateTagToDailyLog: _trpc_server.TRPCMutationProcedure<{
            input: {
                tagId: number;
                dailyLogId: number;
            };
            output: true | _libsql_client.ResultSet;
            meta: object;
        }>;
        delete: _trpc_server.TRPCMutationProcedure<{
            input: number;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
    }>>;
    dailyLog: _trpc_server.TRPCBuiltRouter<{
        ctx: {
            headers: Headers;
            db: drizzle_orm_libsql.LibSQLDatabase<typeof ______db_schema> & {
                $client: _libsql_client.Client;
            };
            session: next_auth.Session | null;
        };
        meta: object;
        errorShape: {
            data: {
                zodError: zod.ZodFlattenedError<unknown, string> | null;
                code: _trpc_server.TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: _trpc_server.TRPC_ERROR_CODE_NUMBER;
        };
        transformer: true;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        getAllUser: _trpc_server.TRPCQueryProcedure<{
            input: string;
            output: {
                date: string;
                id: number;
                notes: string | null;
                image: string | null;
                createdAt: Date;
                updatedAt: Date | null;
                userId: string;
                sleep: string | null;
                morningWeight: string | null;
                fastedBloodGlucose: string | null;
                sleepQuality: string | null;
                isHiit: boolean | null;
                isCardio: boolean | null;
                isLift: boolean | null;
                isLiss: boolean | null;
                isStarred: boolean | null;
                hiit: string | null;
                cardio: string | null;
                weight: string | null;
                liss: string | null;
                posing: string | null;
                steps: string | null;
                sauna: string | null;
                coldPlunge: string | null;
                cardioType: string | null;
                frontImage: string | null;
                sideImage: string | null;
                backImage: string | null;
                frontPoseImage: string | null;
                sidePoseImage: string | null;
                backPoseImage: string | null;
                spareImageOne: string | null;
                spareImageTwo: string | null;
                waistMeasurement: string | null;
                nap: string | null;
                tags: {
                    id: number;
                    dailyLogId: number;
                    tagId: number;
                    tag: {
                        id: number;
                        name: string;
                        createdAt: Date;
                        userId: string;
                        icon: string;
                        color: string;
                    };
                }[];
                supplements: {
                    id: number;
                    notes: string | null;
                    createdAt: Date;
                    time: string | null;
                    supplementId: number;
                    unit: string | null;
                    dailyLogId: number;
                    amount: string | null;
                    supplement: {
                        id: number;
                        name: string | null;
                        notes: string | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                        userId: string | null;
                        favouriteAt: Date | null;
                        deletedAt: Date | null;
                        hiddenAt: Date | null;
                        isAusFood: boolean | null;
                        isAllStores: boolean | null;
                        serveSize: string | null;
                        serveUnit: string | null;
                        publicFoodKey: string | null;
                        classification: string | null;
                        foodName: string | null;
                        caloriesWFibre: string | null;
                        caloriesWOFibre: string | null;
                        protein: string | null;
                        fatTotal: string | null;
                        totalDietaryFibre: string | null;
                        totalSugars: string | null;
                        starch: string | null;
                        resistantStarch: string | null;
                        availableCarbohydrateWithoutSugarAlcohols: string | null;
                        availableCarbohydrateWithSugarAlcohols: string | null;
                        isUserCreated: boolean | null;
                        isSupplement: boolean | null;
                        isPrivate: boolean | null;
                        viewableBy: string | null;
                        intervale: string | null;
                    };
                }[];
                dailyMeals: {
                    date: Date | null;
                    id: number;
                    createdAt: Date;
                    recipeId: number | null;
                    dailyLogId: number;
                    mealIndex: number | null;
                    vegeCalories: string | null;
                    veges: string | null;
                    recipe: {
                        id: number;
                        name: string | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                        serveUnit: string | null;
                        isUserCreated: boolean | null;
                        index: number | null;
                        serve: string | null;
                        note: string | null;
                        userPlanId: number | null;
                        dailyLogId: number | null;
                        mealIndex: number | null;
                        dailyMealId: number | null;
                        recipeIndex: number | null;
                        parentId: number | null;
                        isLog: boolean | null;
                    }[];
                    ingredients: {
                        id: number;
                        name: string | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                        serveUnit: string | null;
                        isUserCreated: boolean | null;
                        ingredientId: number | null;
                        alternateId: number | null;
                        serve: string | null;
                        note: string | null;
                        userPlanId: number | null;
                        dailyLogId: number | null;
                        mealIndex: number | null;
                        dailyMealId: number | null;
                        recipeIndex: number | null;
                        ingredient: {
                            id: number;
                            name: string | null;
                            notes: string | null;
                            createdAt: Date;
                            updatedAt: Date | null;
                            userId: string | null;
                            favouriteAt: Date | null;
                            deletedAt: Date | null;
                            hiddenAt: Date | null;
                            isAusFood: boolean | null;
                            isAllStores: boolean | null;
                            serveSize: string | null;
                            serveUnit: string | null;
                            publicFoodKey: string | null;
                            classification: string | null;
                            foodName: string | null;
                            caloriesWFibre: string | null;
                            caloriesWOFibre: string | null;
                            protein: string | null;
                            fatTotal: string | null;
                            totalDietaryFibre: string | null;
                            totalSugars: string | null;
                            starch: string | null;
                            resistantStarch: string | null;
                            availableCarbohydrateWithoutSugarAlcohols: string | null;
                            availableCarbohydrateWithSugarAlcohols: string | null;
                            isUserCreated: boolean | null;
                            isSupplement: boolean | null;
                            isPrivate: boolean | null;
                            viewableBy: string | null;
                            intervale: string | null;
                        } | null;
                    }[];
                }[];
                waterLogs: {
                    id: number;
                    createdAt: Date;
                    dailyLogId: number;
                    amount: string | null;
                }[];
                poopLogs: {
                    id: number;
                    createdAt: Date;
                    dailyLogId: number;
                }[];
            }[];
            meta: object;
        }>;
        getAllCurrentUser: _trpc_server.TRPCQueryProcedure<{
            input: {
                id: string;
            } | undefined;
            output: {
                date: string;
                id: number;
                notes: string | null;
                image: string | null;
                createdAt: Date;
                updatedAt: Date | null;
                userId: string;
                sleep: string | null;
                morningWeight: string | null;
                fastedBloodGlucose: string | null;
                sleepQuality: string | null;
                isHiit: boolean | null;
                isCardio: boolean | null;
                isLift: boolean | null;
                isLiss: boolean | null;
                isStarred: boolean | null;
                hiit: string | null;
                cardio: string | null;
                weight: string | null;
                liss: string | null;
                posing: string | null;
                steps: string | null;
                sauna: string | null;
                coldPlunge: string | null;
                cardioType: string | null;
                frontImage: string | null;
                sideImage: string | null;
                backImage: string | null;
                frontPoseImage: string | null;
                sidePoseImage: string | null;
                backPoseImage: string | null;
                spareImageOne: string | null;
                spareImageTwo: string | null;
                waistMeasurement: string | null;
                nap: string | null;
                tags: {
                    id: number;
                    dailyLogId: number;
                    tagId: number;
                    tag: {
                        id: number;
                        name: string;
                        createdAt: Date;
                        userId: string;
                        icon: string;
                        color: string;
                    };
                }[];
                supplements: {
                    id: number;
                    notes: string | null;
                    createdAt: Date;
                    time: string | null;
                    supplementId: number;
                    unit: string | null;
                    dailyLogId: number;
                    amount: string | null;
                    supplement: {
                        id: number;
                        name: string | null;
                        notes: string | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                        userId: string | null;
                        favouriteAt: Date | null;
                        deletedAt: Date | null;
                        hiddenAt: Date | null;
                        isAusFood: boolean | null;
                        isAllStores: boolean | null;
                        serveSize: string | null;
                        serveUnit: string | null;
                        publicFoodKey: string | null;
                        classification: string | null;
                        foodName: string | null;
                        caloriesWFibre: string | null;
                        caloriesWOFibre: string | null;
                        protein: string | null;
                        fatTotal: string | null;
                        totalDietaryFibre: string | null;
                        totalSugars: string | null;
                        starch: string | null;
                        resistantStarch: string | null;
                        availableCarbohydrateWithoutSugarAlcohols: string | null;
                        availableCarbohydrateWithSugarAlcohols: string | null;
                        isUserCreated: boolean | null;
                        isSupplement: boolean | null;
                        isPrivate: boolean | null;
                        viewableBy: string | null;
                        intervale: string | null;
                    };
                }[];
                dailyMeals: {
                    date: Date | null;
                    id: number;
                    createdAt: Date;
                    recipeId: number | null;
                    dailyLogId: number;
                    mealIndex: number | null;
                    vegeCalories: string | null;
                    veges: string | null;
                    recipe: {
                        id: number;
                        name: string | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                        serveUnit: string | null;
                        isUserCreated: boolean | null;
                        index: number | null;
                        serve: string | null;
                        note: string | null;
                        userPlanId: number | null;
                        dailyLogId: number | null;
                        mealIndex: number | null;
                        dailyMealId: number | null;
                        recipeIndex: number | null;
                        parentId: number | null;
                        isLog: boolean | null;
                    }[];
                    ingredients: {
                        id: number;
                        name: string | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                        serveUnit: string | null;
                        isUserCreated: boolean | null;
                        ingredientId: number | null;
                        alternateId: number | null;
                        serve: string | null;
                        note: string | null;
                        userPlanId: number | null;
                        dailyLogId: number | null;
                        mealIndex: number | null;
                        dailyMealId: number | null;
                        recipeIndex: number | null;
                        ingredient: {
                            id: number;
                            name: string | null;
                            notes: string | null;
                            createdAt: Date;
                            updatedAt: Date | null;
                            userId: string | null;
                            favouriteAt: Date | null;
                            deletedAt: Date | null;
                            hiddenAt: Date | null;
                            isAusFood: boolean | null;
                            isAllStores: boolean | null;
                            serveSize: string | null;
                            serveUnit: string | null;
                            publicFoodKey: string | null;
                            classification: string | null;
                            foodName: string | null;
                            caloriesWFibre: string | null;
                            caloriesWOFibre: string | null;
                            protein: string | null;
                            fatTotal: string | null;
                            totalDietaryFibre: string | null;
                            totalSugars: string | null;
                            starch: string | null;
                            resistantStarch: string | null;
                            availableCarbohydrateWithoutSugarAlcohols: string | null;
                            availableCarbohydrateWithSugarAlcohols: string | null;
                            isUserCreated: boolean | null;
                            isSupplement: boolean | null;
                            isPrivate: boolean | null;
                            viewableBy: string | null;
                            intervale: string | null;
                        } | null;
                    }[];
                }[];
                waterLogs: {
                    id: number;
                    createdAt: Date;
                    dailyLogId: number;
                    amount: string | null;
                }[];
                poopLogs: {
                    id: number;
                    createdAt: Date;
                    dailyLogId: number;
                }[];
            }[] | null;
            meta: object;
        }>;
        getSimple: _trpc_server.TRPCQueryProcedure<{
            input: number;
            output: {
                date: string;
                id: number;
                notes: string | null;
                image: string | null;
                createdAt: Date;
                updatedAt: Date | null;
                userId: string;
                sleep: string | null;
                morningWeight: string | null;
                fastedBloodGlucose: string | null;
                sleepQuality: string | null;
                isHiit: boolean | null;
                isCardio: boolean | null;
                isLift: boolean | null;
                isLiss: boolean | null;
                isStarred: boolean | null;
                hiit: string | null;
                cardio: string | null;
                weight: string | null;
                liss: string | null;
                posing: string | null;
                steps: string | null;
                sauna: string | null;
                coldPlunge: string | null;
                cardioType: string | null;
                frontImage: string | null;
                sideImage: string | null;
                backImage: string | null;
                frontPoseImage: string | null;
                sidePoseImage: string | null;
                backPoseImage: string | null;
                spareImageOne: string | null;
                spareImageTwo: string | null;
                waistMeasurement: string | null;
                nap: string | null;
            } | undefined;
            meta: object;
        }>;
        get: _trpc_server.TRPCQueryProcedure<{
            input: number;
            output: {
                date: string;
                id: number;
                notes: string | null;
                image: string | null;
                createdAt: Date;
                updatedAt: Date | null;
                userId: string;
                sleep: string | null;
                morningWeight: string | null;
                fastedBloodGlucose: string | null;
                sleepQuality: string | null;
                isHiit: boolean | null;
                isCardio: boolean | null;
                isLift: boolean | null;
                isLiss: boolean | null;
                isStarred: boolean | null;
                hiit: string | null;
                cardio: string | null;
                weight: string | null;
                liss: string | null;
                posing: string | null;
                steps: string | null;
                sauna: string | null;
                coldPlunge: string | null;
                cardioType: string | null;
                frontImage: string | null;
                sideImage: string | null;
                backImage: string | null;
                frontPoseImage: string | null;
                sidePoseImage: string | null;
                backPoseImage: string | null;
                spareImageOne: string | null;
                spareImageTwo: string | null;
                waistMeasurement: string | null;
                nap: string | null;
                tags: {
                    id: number;
                    dailyLogId: number;
                    tagId: number;
                    tag: {
                        id: number;
                        name: string;
                        createdAt: Date;
                        userId: string;
                        icon: string;
                        color: string;
                    };
                }[];
                supplements: {
                    id: number;
                    notes: string | null;
                    createdAt: Date;
                    time: string | null;
                    supplementId: number;
                    unit: string | null;
                    dailyLogId: number;
                    amount: string | null;
                    supplement: {
                        id: number;
                        name: string | null;
                        notes: string | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                        userId: string | null;
                        favouriteAt: Date | null;
                        deletedAt: Date | null;
                        hiddenAt: Date | null;
                        isAusFood: boolean | null;
                        isAllStores: boolean | null;
                        serveSize: string | null;
                        serveUnit: string | null;
                        publicFoodKey: string | null;
                        classification: string | null;
                        foodName: string | null;
                        caloriesWFibre: string | null;
                        caloriesWOFibre: string | null;
                        protein: string | null;
                        fatTotal: string | null;
                        totalDietaryFibre: string | null;
                        totalSugars: string | null;
                        starch: string | null;
                        resistantStarch: string | null;
                        availableCarbohydrateWithoutSugarAlcohols: string | null;
                        availableCarbohydrateWithSugarAlcohols: string | null;
                        isUserCreated: boolean | null;
                        isSupplement: boolean | null;
                        isPrivate: boolean | null;
                        viewableBy: string | null;
                        intervale: string | null;
                    };
                }[];
                dailyMeals: {
                    date: Date | null;
                    id: number;
                    createdAt: Date;
                    recipeId: number | null;
                    dailyLogId: number;
                    mealIndex: number | null;
                    vegeCalories: string | null;
                    veges: string | null;
                    recipe: {
                        id: number;
                        name: string | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                        serveUnit: string | null;
                        isUserCreated: boolean | null;
                        index: number | null;
                        serve: string | null;
                        note: string | null;
                        userPlanId: number | null;
                        dailyLogId: number | null;
                        mealIndex: number | null;
                        dailyMealId: number | null;
                        recipeIndex: number | null;
                        parentId: number | null;
                        isLog: boolean | null;
                    }[];
                    ingredients: {
                        id: number;
                        name: string | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                        serveUnit: string | null;
                        isUserCreated: boolean | null;
                        ingredientId: number | null;
                        alternateId: number | null;
                        serve: string | null;
                        note: string | null;
                        userPlanId: number | null;
                        dailyLogId: number | null;
                        mealIndex: number | null;
                        dailyMealId: number | null;
                        recipeIndex: number | null;
                        ingredient: {
                            id: number;
                            name: string | null;
                            notes: string | null;
                            createdAt: Date;
                            updatedAt: Date | null;
                            userId: string | null;
                            favouriteAt: Date | null;
                            deletedAt: Date | null;
                            hiddenAt: Date | null;
                            isAusFood: boolean | null;
                            isAllStores: boolean | null;
                            serveSize: string | null;
                            serveUnit: string | null;
                            publicFoodKey: string | null;
                            classification: string | null;
                            foodName: string | null;
                            caloriesWFibre: string | null;
                            caloriesWOFibre: string | null;
                            protein: string | null;
                            fatTotal: string | null;
                            totalDietaryFibre: string | null;
                            totalSugars: string | null;
                            starch: string | null;
                            resistantStarch: string | null;
                            availableCarbohydrateWithoutSugarAlcohols: string | null;
                            availableCarbohydrateWithSugarAlcohols: string | null;
                            isUserCreated: boolean | null;
                            isSupplement: boolean | null;
                            isPrivate: boolean | null;
                            viewableBy: string | null;
                            intervale: string | null;
                        } | null;
                    }[];
                }[];
                waterLogs: {
                    id: number;
                    createdAt: Date;
                    dailyLogId: number;
                    amount: string | null;
                }[];
                poopLogs: {
                    id: number;
                    createdAt: Date;
                    dailyLogId: number;
                }[];
            } | undefined;
            meta: object;
        }>;
        update: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
                date: string;
                userId: string;
                morningWeight?: string | undefined;
                notes?: string | undefined;
                sleep?: string | undefined;
                sleepQuality?: string | undefined;
                fastedBloodGlucose?: string | undefined;
                nap?: string | undefined;
                waistMeasurement?: string | undefined;
                isHiit?: boolean | undefined;
                isCardio?: boolean | undefined;
                isLift?: boolean | undefined;
                isLiss?: boolean | undefined;
                image?: string | undefined;
            };
            output: {
                res: _libsql_client.ResultSet;
            };
            meta: object;
        }>;
        updateIsStarred: _trpc_server.TRPCMutationProcedure<{
            input: {
                date: string;
                isStarred: boolean;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateSupplement: _trpc_server.TRPCMutationProcedure<{
            input: {
                date: string;
                suppId: number;
                amount: number;
                unit: string;
            };
            output: {
                id: number;
            }[];
            meta: object;
        }>;
        updateNote: _trpc_server.TRPCMutationProcedure<{
            input: {
                date: string;
                notes: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updatePosing: _trpc_server.TRPCMutationProcedure<{
            input: {
                date: string;
                posing: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateSleep: _trpc_server.TRPCMutationProcedure<{
            input: {
                date: string;
                sleep: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateSleepQuality: _trpc_server.TRPCMutationProcedure<{
            input: {
                date: string;
                sleepQuality: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateSteps: _trpc_server.TRPCMutationProcedure<{
            input: {
                date: string;
                steps: string;
            };
            output: _libsql_client.ResultSet | undefined;
            meta: object;
        }>;
        updateSauna: _trpc_server.TRPCMutationProcedure<{
            input: {
                date: string;
                sauna: string;
            };
            output: _libsql_client.ResultSet | undefined;
            meta: object;
        }>;
        updateColdPlunge: _trpc_server.TRPCMutationProcedure<{
            input: {
                date: string;
                coldPlunge: string;
            };
            output: _libsql_client.ResultSet | undefined;
            meta: object;
        }>;
        updateNap: _trpc_server.TRPCMutationProcedure<{
            input: {
                date: string;
                nap: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateHiit: _trpc_server.TRPCMutationProcedure<{
            input: {
                date: string;
                hiit: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateCardio: _trpc_server.TRPCMutationProcedure<{
            input: {
                date: string;
                cardio: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateWeightTraining: _trpc_server.TRPCMutationProcedure<{
            input: {
                date: string;
                weight: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateLiss: _trpc_server.TRPCMutationProcedure<{
            input: {
                date: string;
                liss: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateWaistMeasurement: _trpc_server.TRPCMutationProcedure<{
            input: {
                date: string;
                waistMeasurement: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateWeight: _trpc_server.TRPCMutationProcedure<{
            input: {
                date: string;
                morningWeight: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateBloodGlucose: _trpc_server.TRPCMutationProcedure<{
            input: {
                date: string;
                fastedBloodGlucose: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateFrontImage: _trpc_server.TRPCMutationProcedure<{
            input: {
                logId: number;
                image: string;
            };
            output: boolean;
            meta: object;
        }>;
        updateSideImage: _trpc_server.TRPCMutationProcedure<{
            input: {
                logId: number;
                image: string;
            };
            output: boolean;
            meta: object;
        }>;
        updateBackImage: _trpc_server.TRPCMutationProcedure<{
            input: {
                logId: number;
                image: string;
            };
            output: boolean;
            meta: object;
        }>;
        updateBodyBuilderImage: _trpc_server.TRPCMutationProcedure<{
            input: {
                date: string;
                image: string;
                name: string;
                userId: string;
            };
            output: {
                id: number;
            }[];
            meta: object;
        }>;
        updateImage: _trpc_server.TRPCMutationProcedure<{
            input: {
                date: string;
                image: string;
            };
            output: boolean;
            meta: object;
        }>;
        addWaterLog: _trpc_server.TRPCMutationProcedure<{
            input: {
                date: string;
                amount: number;
            };
            output: {
                id: number;
            }[];
            meta: object;
        }>;
        deleteWaterLog: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        addPoopLog: _trpc_server.TRPCMutationProcedure<{
            input: {
                date: string;
            };
            output: {
                id: number;
            }[];
            meta: object;
        }>;
        deletePoopLog: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        create: _trpc_server.TRPCMutationProcedure<{
            input: {
                date: string;
                userId: string;
                morningWeight?: string | undefined;
                fastedBloodGlucose?: string | undefined;
                notes?: string | undefined;
                sleep?: string | undefined;
                sleepQuality?: string | undefined;
                nap?: string | undefined;
                waistMeasurement?: string | undefined;
                isHiit?: boolean | undefined;
                isCardio?: boolean | undefined;
                isLift?: boolean | undefined;
                isLiss?: boolean | undefined;
                image?: string | undefined;
            };
            output: {
                res: {
                    id: number;
                }[];
            };
            meta: object;
        }>;
        deleteMeal: _trpc_server.TRPCMutationProcedure<{
            input: {
                mealIndex: number;
                logId: number;
            };
            output: boolean;
            meta: object;
        }>;
        copyWeek: _trpc_server.TRPCMutationProcedure<{
            input: {
                userId: string;
                logId: number;
            };
            output: boolean;
            meta: object;
        }>;
        clearDay: _trpc_server.TRPCMutationProcedure<{
            input: {
                logId: number;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        addUserCreatedRecipe: _trpc_server.TRPCMutationProcedure<{
            input: {
                mealIndex: number;
                logId: number;
                recipe: {
                    name: string;
                    description: string;
                    image: string;
                    notes: string;
                    recipeCategory: string;
                    calories: number;
                    ingredients: {
                        ingredientId: number;
                        alternateId: string;
                        note: string;
                        serveSize: string;
                        serveUnit: string;
                        index: number;
                        isAlternate?: boolean | undefined;
                    }[];
                };
            };
            output: {
                meal: {
                    id: number;
                }[];
                recipe: {
                    id: number;
                }[];
                ingredient: {
                    id: number;
                }[];
            } | undefined;
            meta: object;
        }>;
        addMeal: _trpc_server.TRPCMutationProcedure<{
            input: {
                userId: string;
                planId: number;
                mealIndex: number | null;
                date: Date;
                logId: number | null;
                recipeIndex?: number | null | undefined;
                recipeId?: number | null | undefined;
            };
            output: {
                meal: {
                    id: number;
                }[];
                recipe?: undefined;
                ingredient?: undefined;
            } | {
                meal: {
                    id: number;
                }[];
                recipe: {
                    id: number;
                }[];
                ingredient: {
                    id: number;
                }[];
            } | undefined;
            meta: object;
        }>;
        delete: _trpc_server.TRPCMutationProcedure<{
            input: number;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        deleteAll: _trpc_server.TRPCMutationProcedure<{
            input: string;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
    }>>;
    user: _trpc_server.TRPCBuiltRouter<{
        ctx: {
            headers: Headers;
            db: drizzle_orm_libsql.LibSQLDatabase<typeof ______db_schema> & {
                $client: _libsql_client.Client;
            };
            session: next_auth.Session | null;
        };
        meta: object;
        errorShape: {
            data: {
                zodError: zod.ZodFlattenedError<unknown, string> | null;
                code: _trpc_server.TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: _trpc_server.TRPC_ERROR_CODE_NUMBER;
        };
        transformer: true;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        getNotifications: _trpc_server.TRPCQueryProcedure<{
            input: {
                userId: string;
            };
            output: {
                type: string | null;
                id: number;
                createdAt: Date;
                userId: string;
                interval: string | null;
                sleep: string | null;
            }[];
            meta: object;
        }>;
        toggleNotification: _trpc_server.TRPCMutationProcedure<{
            input: {
                userId: string;
                type: string;
                interval: string;
                sleep?: string | undefined;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateNotification: _trpc_server.TRPCMutationProcedure<{
            input: {
                interval: string;
                id: number;
                sleep?: string | undefined;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        getAdminLogs: _trpc_server.TRPCQueryProcedure<{
            input: void;
            output: {
                user: string | null;
                id: number;
                notes: string | null;
                createdAt: Date;
                userId: string | null;
                objectId: number | null;
                task: string | null;
            }[];
            meta: object;
        }>;
        deleteAdminLog: _trpc_server.TRPCMutationProcedure<{
            input: number;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        createUser: _trpc_server.TRPCMutationProcedure<{
            input: {
                email: string;
                password: string;
                firstName: string;
                lastName: string;
                birthDate?: Date | null | undefined;
                isCreator?: boolean | undefined;
                isTrainer?: boolean | undefined;
                isRoot?: boolean | undefined;
            };
            output: {
                user: string;
                password: string;
            };
            meta: object;
        }>;
        deleteUser: _trpc_server.TRPCMutationProcedure<{
            input: string;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        createFakeUsers: _trpc_server.TRPCMutationProcedure<{
            input: void;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateRoot: _trpc_server.TRPCMutationProcedure<{
            input: {
                isRoot: boolean;
                id: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateRoleBodyBuilderImages: _trpc_server.TRPCMutationProcedure<{
            input: {
                userId: string;
            };
            output: {
                id: number;
                name: string | null;
                createdAt: Date;
                updatedAt: Date | null;
                userId: string | null;
            } | undefined;
            meta: object;
        }>;
        updateRoleSupplementDisclaimer: _trpc_server.TRPCMutationProcedure<{
            input: {
                userId: string;
            };
            output: {
                id: number;
                name: string | null;
                createdAt: Date;
                updatedAt: Date | null;
                userId: string | null;
            } | undefined;
            meta: object;
        }>;
        updateRoleSupplements: _trpc_server.TRPCMutationProcedure<{
            input: {
                userId: string;
            };
            output: {
                id: number;
                name: string | null;
                createdAt: Date;
                updatedAt: Date | null;
                userId: string | null;
            } | undefined;
            meta: object;
        }>;
        updateRoleCreateMeals: _trpc_server.TRPCMutationProcedure<{
            input: {
                userId: string;
            };
            output: {
                id: number;
                name: string | null;
                createdAt: Date;
                updatedAt: Date | null;
                userId: string | null;
            } | undefined;
            meta: object;
        }>;
        updateRoleAdmin: _trpc_server.TRPCMutationProcedure<{
            input: {
                userId: string;
            };
            output: {
                id: number;
                name: string | null;
                createdAt: Date;
                updatedAt: Date | null;
                userId: string | null;
            } | undefined;
            meta: object;
        }>;
        updateChartRange: _trpc_server.TRPCMutationProcedure<{
            input: {
                range: number;
                id: number;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateWater: _trpc_server.TRPCMutationProcedure<{
            input: {
                water: number;
                id: number;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateIsPosing: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: string;
                isPosing: boolean;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateIsBloodGlucose: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: string;
                isBloodGlucose: boolean;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateIsSleep: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: string;
                isSleep: boolean;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateIsSleepQuality: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: string;
                isSleepQuality: boolean;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateIsNap: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: string;
                isNap: boolean;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateIsWeightTraining: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: string;
                isWeightTraining: boolean;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateIsHiit: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: string;
                isHiit: boolean;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateIsLiss: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: string;
                isLiss: boolean;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateIsNote: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: string;
                isNote: boolean;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateIsSauna: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: string;
                isSauna: boolean;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateIsColdPlunge: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: string;
                isColdPlunge: boolean;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateIsSteps: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: string;
                isSteps: boolean;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateTrainer: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: string;
                isTrainer: boolean;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateFirstName: _trpc_server.TRPCMutationProcedure<{
            input: {
                firstName: string;
                id: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateLastName: _trpc_server.TRPCMutationProcedure<{
            input: {
                lastName: string;
                id: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateEmail: _trpc_server.TRPCMutationProcedure<{
            input: {
                email: string;
                id: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updatePassword: _trpc_server.TRPCMutationProcedure<{
            input: {
                password: string;
                id: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        getBasic: _trpc_server.TRPCQueryProcedure<{
            input: string;
            output: {
                id: string;
                name: string | null;
                firstName: string | null;
                lastName: string | null;
                clerkId: string | null;
                birthDate: Date | null;
                gender: string | null;
                address: string | null;
                notes: string | null;
                instagram: string | null;
                openLifter: string | null;
                phone: string | null;
                email: string | null;
                emailVerified: Date | null;
                currentPlanId: number | null;
                image: string | null;
                isFake: boolean | null;
                isTrainer: boolean | null;
                isRoot: boolean | null;
                isCreator: boolean | null;
                isAllTrainers: boolean | null;
                createdAt: Date;
                updatedAt: Date | null;
                roles: {
                    id: number;
                    name: string | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                    userId: string | null;
                }[];
                trainers: {
                    userId: string;
                    trainerId: string;
                    trainer: {
                        id: string;
                        name: string | null;
                        firstName: string | null;
                        lastName: string | null;
                        clerkId: string | null;
                        birthDate: Date | null;
                        gender: string | null;
                        address: string | null;
                        notes: string | null;
                        instagram: string | null;
                        openLifter: string | null;
                        phone: string | null;
                        email: string | null;
                        emailVerified: Date | null;
                        password: string | null;
                        currentPlanId: number | null;
                        image: string | null;
                        isFake: boolean | null;
                        isTrainer: boolean | null;
                        isRoot: boolean | null;
                        isCreator: boolean | null;
                        isAllTrainers: boolean | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                    };
                }[];
                category: {
                    userId: string;
                    categoryId: number;
                    category: {
                        id: number;
                        name: string | null;
                    };
                }[];
            } | undefined;
            meta: object;
        }>;
        getAllYour: _trpc_server.TRPCQueryProcedure<{
            input: string | undefined;
            output: {
                id: string;
                name: string | null;
                firstName: string | null;
                lastName: string | null;
                clerkId: string | null;
                birthDate: Date | null;
                gender: string | null;
                address: string | null;
                notes: string | null;
                instagram: string | null;
                openLifter: string | null;
                phone: string | null;
                email: string | null;
                emailVerified: Date | null;
                currentPlanId: number | null;
                image: string | null;
                isFake: boolean | null;
                isTrainer: boolean | null;
                isRoot: boolean | null;
                isCreator: boolean | null;
                isAllTrainers: boolean | null;
                createdAt: Date;
                updatedAt: Date | null;
                roles: {
                    id: number;
                    name: string | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                    userId: string | null;
                }[];
                trainers: {
                    userId: string;
                    trainerId: string;
                    trainer: {
                        id: string;
                        name: string | null;
                        firstName: string | null;
                        lastName: string | null;
                        clerkId: string | null;
                        birthDate: Date | null;
                        gender: string | null;
                        address: string | null;
                        notes: string | null;
                        instagram: string | null;
                        openLifter: string | null;
                        phone: string | null;
                        email: string | null;
                        emailVerified: Date | null;
                        password: string | null;
                        currentPlanId: number | null;
                        image: string | null;
                        isFake: boolean | null;
                        isTrainer: boolean | null;
                        isRoot: boolean | null;
                        isCreator: boolean | null;
                        isAllTrainers: boolean | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                    };
                }[];
                category: {
                    userId: string;
                    categoryId: number;
                    category: {
                        id: number;
                        name: string | null;
                    };
                }[];
            }[];
            meta: object;
        }>;
        getAll: _trpc_server.TRPCQueryProcedure<{
            input: void;
            output: {
                id: string;
                name: string | null;
                firstName: string | null;
                lastName: string | null;
                clerkId: string | null;
                birthDate: Date | null;
                gender: string | null;
                address: string | null;
                notes: string | null;
                instagram: string | null;
                openLifter: string | null;
                phone: string | null;
                email: string | null;
                emailVerified: Date | null;
                currentPlanId: number | null;
                image: string | null;
                isFake: boolean | null;
                isTrainer: boolean | null;
                isRoot: boolean | null;
                isCreator: boolean | null;
                isAllTrainers: boolean | null;
                createdAt: Date;
                updatedAt: Date | null;
                roles: {
                    id: number;
                    name: string | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                    userId: string | null;
                }[];
                trainers: {
                    userId: string;
                    trainerId: string;
                    trainer: {
                        id: string;
                        name: string | null;
                        firstName: string | null;
                        lastName: string | null;
                        clerkId: string | null;
                        birthDate: Date | null;
                        gender: string | null;
                        address: string | null;
                        notes: string | null;
                        instagram: string | null;
                        openLifter: string | null;
                        phone: string | null;
                        email: string | null;
                        emailVerified: Date | null;
                        password: string | null;
                        currentPlanId: number | null;
                        image: string | null;
                        isFake: boolean | null;
                        isTrainer: boolean | null;
                        isRoot: boolean | null;
                        isCreator: boolean | null;
                        isAllTrainers: boolean | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                    };
                }[];
                category: {
                    userId: string;
                    categoryId: number;
                    category: {
                        id: number;
                        name: string | null;
                    };
                }[];
            }[];
            meta: object;
        }>;
        checkEmail: _trpc_server.TRPCMutationProcedure<{
            input: string;
            output: boolean;
            meta: object;
        }>;
        getGaurenteed: _trpc_server.TRPCQueryProcedure<{
            input: string;
            output: {
                id: string;
                name: string | null;
                firstName: string | null;
                lastName: string | null;
                clerkId: string | null;
                birthDate: Date | null;
                gender: string | null;
                address: string | null;
                notes: string | null;
                instagram: string | null;
                openLifter: string | null;
                phone: string | null;
                email: string | null;
                emailVerified: Date | null;
                currentPlanId: number | null;
                image: string | null;
                isFake: boolean | null;
                isTrainer: boolean | null;
                isRoot: boolean | null;
                isCreator: boolean | null;
                isAllTrainers: boolean | null;
                createdAt: Date;
                updatedAt: Date | null;
                roles: {
                    id: number;
                    name: string | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                    userId: string | null;
                }[];
                userPlans: {
                    id: number;
                    name: string;
                    notes: string;
                    image: string;
                    createdAt: Date;
                    updatedAt: Date | null;
                    description: string;
                    userId: string;
                    finishedAt: Date | null;
                    startAt: Date | null;
                    isActive: boolean | null;
                    numberOfMeals: number | null;
                    creatorId: string;
                    favouriteAt: Date | null;
                    deletedAt: Date | null;
                    hiddenAt: Date | null;
                    userMeals: {
                        id: number;
                        createdAt: Date;
                        updatedAt: Date | null;
                        protein: string | null;
                        calories: string | null;
                        note: string | null;
                        userPlanId: number;
                        mealIndex: number | null;
                        vegeCalories: string | null;
                        veges: string | null;
                        vegeNotes: string | null;
                        mealTitle: string | null;
                        targetProtein: string | null;
                        targetCalories: string | null;
                    }[];
                    userRecipes: {
                        id: number;
                        name: string | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                        serveUnit: string | null;
                        isUserCreated: boolean | null;
                        index: number | null;
                        serve: string | null;
                        note: string | null;
                        userPlanId: number | null;
                        dailyLogId: number | null;
                        mealIndex: number | null;
                        dailyMealId: number | null;
                        recipeIndex: number | null;
                        parentId: number | null;
                        isLog: boolean | null;
                    }[];
                    userIngredients: {
                        id: number;
                        name: string | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                        serveUnit: string | null;
                        isUserCreated: boolean | null;
                        ingredientId: number | null;
                        alternateId: number | null;
                        serve: string | null;
                        note: string | null;
                        userPlanId: number | null;
                        dailyLogId: number | null;
                        mealIndex: number | null;
                        dailyMealId: number | null;
                        recipeIndex: number | null;
                        ingredient: {
                            id: number;
                            name: string | null;
                            notes: string | null;
                            createdAt: Date;
                            updatedAt: Date | null;
                            userId: string | null;
                            favouriteAt: Date | null;
                            deletedAt: Date | null;
                            hiddenAt: Date | null;
                            isAusFood: boolean | null;
                            isAllStores: boolean | null;
                            serveSize: string | null;
                            serveUnit: string | null;
                            publicFoodKey: string | null;
                            classification: string | null;
                            foodName: string | null;
                            caloriesWFibre: string | null;
                            caloriesWOFibre: string | null;
                            protein: string | null;
                            fatTotal: string | null;
                            totalDietaryFibre: string | null;
                            totalSugars: string | null;
                            starch: string | null;
                            resistantStarch: string | null;
                            availableCarbohydrateWithoutSugarAlcohols: string | null;
                            availableCarbohydrateWithSugarAlcohols: string | null;
                            isUserCreated: boolean | null;
                            isSupplement: boolean | null;
                            isPrivate: boolean | null;
                            viewableBy: string | null;
                            intervale: string | null;
                        } | null;
                        alternateIngredient: {
                            id: number;
                            name: string | null;
                            notes: string | null;
                            createdAt: Date;
                            updatedAt: Date | null;
                            userId: string | null;
                            favouriteAt: Date | null;
                            deletedAt: Date | null;
                            hiddenAt: Date | null;
                            isAusFood: boolean | null;
                            isAllStores: boolean | null;
                            serveSize: string | null;
                            serveUnit: string | null;
                            publicFoodKey: string | null;
                            classification: string | null;
                            foodName: string | null;
                            caloriesWFibre: string | null;
                            caloriesWOFibre: string | null;
                            protein: string | null;
                            fatTotal: string | null;
                            totalDietaryFibre: string | null;
                            totalSugars: string | null;
                            starch: string | null;
                            resistantStarch: string | null;
                            availableCarbohydrateWithoutSugarAlcohols: string | null;
                            availableCarbohydrateWithSugarAlcohols: string | null;
                            isUserCreated: boolean | null;
                            isSupplement: boolean | null;
                            isPrivate: boolean | null;
                            viewableBy: string | null;
                            intervale: string | null;
                        } | null;
                    }[];
                }[];
                images: {
                    date: string;
                    id: number;
                    name: string;
                    image: string;
                    createdAt: Date;
                    userId: string;
                }[];
                settings: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date | null;
                    userId: string;
                    isHiit: boolean | null;
                    isLiss: boolean | null;
                    defaultWater: string | null;
                    defaultChartRange: string | null;
                    isPosing: boolean | null;
                    isBloodGlucose: boolean | null;
                    isSleep: boolean | null;
                    isSleepQuality: boolean | null;
                    isNap: boolean | null;
                    isWeightTraining: boolean | null;
                    isNotes: boolean | null;
                    isSteps: boolean | null;
                    isSauna: boolean | null;
                    isColdPlunge: boolean | null;
                };
                supplementStacks: {
                    id: number;
                    name: string | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                    userId: string;
                    time: string | null;
                    isTemplate: boolean | null;
                    supplements: {
                        id: number;
                        supplementId: number;
                        supplementStackId: number;
                        size: string | null;
                        unit: string | null;
                        supplement: {
                            id: number;
                            name: string | null;
                            notes: string | null;
                            createdAt: Date;
                            updatedAt: Date | null;
                            userId: string | null;
                            favouriteAt: Date | null;
                            deletedAt: Date | null;
                            hiddenAt: Date | null;
                            isAusFood: boolean | null;
                            isAllStores: boolean | null;
                            serveSize: string | null;
                            serveUnit: string | null;
                            publicFoodKey: string | null;
                            classification: string | null;
                            foodName: string | null;
                            caloriesWFibre: string | null;
                            caloriesWOFibre: string | null;
                            protein: string | null;
                            fatTotal: string | null;
                            totalDietaryFibre: string | null;
                            totalSugars: string | null;
                            starch: string | null;
                            resistantStarch: string | null;
                            availableCarbohydrateWithoutSugarAlcohols: string | null;
                            availableCarbohydrateWithSugarAlcohols: string | null;
                            isUserCreated: boolean | null;
                            isSupplement: boolean | null;
                            isPrivate: boolean | null;
                            viewableBy: string | null;
                            intervale: string | null;
                        };
                    }[];
                }[];
            };
            meta: object;
        }>;
        getByEmail: _trpc_server.TRPCQueryProcedure<{
            input: string;
            output: {
                id: string;
                name: string | null;
                firstName: string | null;
                lastName: string | null;
                clerkId: string | null;
                birthDate: Date | null;
                gender: string | null;
                address: string | null;
                notes: string | null;
                instagram: string | null;
                openLifter: string | null;
                phone: string | null;
                email: string | null;
                emailVerified: Date | null;
                currentPlanId: number | null;
                image: string | null;
                isFake: boolean | null;
                isTrainer: boolean | null;
                isRoot: boolean | null;
                isCreator: boolean | null;
                isAllTrainers: boolean | null;
                createdAt: Date;
                updatedAt: Date | null;
            } | undefined;
            meta: object;
        }>;
        get: _trpc_server.TRPCQueryProcedure<{
            input: string;
            output: {
                id: string;
                name: string | null;
                firstName: string | null;
                lastName: string | null;
                clerkId: string | null;
                birthDate: Date | null;
                gender: string | null;
                address: string | null;
                notes: string | null;
                instagram: string | null;
                openLifter: string | null;
                phone: string | null;
                email: string | null;
                emailVerified: Date | null;
                currentPlanId: number | null;
                image: string | null;
                isFake: boolean | null;
                isTrainer: boolean | null;
                isRoot: boolean | null;
                isCreator: boolean | null;
                isAllTrainers: boolean | null;
                createdAt: Date;
                updatedAt: Date | null;
                roles: {
                    id: number;
                    name: string | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                    userId: string | null;
                }[];
                trainers: {
                    userId: string;
                    trainerId: string;
                }[];
                userPlans: {
                    id: number;
                    name: string;
                    notes: string;
                    image: string;
                    createdAt: Date;
                    updatedAt: Date | null;
                    description: string;
                    userId: string;
                    finishedAt: Date | null;
                    startAt: Date | null;
                    isActive: boolean | null;
                    numberOfMeals: number | null;
                    creatorId: string;
                    favouriteAt: Date | null;
                    deletedAt: Date | null;
                    hiddenAt: Date | null;
                    userMeals: {
                        id: number;
                        createdAt: Date;
                        updatedAt: Date | null;
                        protein: string | null;
                        calories: string | null;
                        note: string | null;
                        userPlanId: number;
                        mealIndex: number | null;
                        vegeCalories: string | null;
                        veges: string | null;
                        vegeNotes: string | null;
                        mealTitle: string | null;
                        targetProtein: string | null;
                        targetCalories: string | null;
                    }[];
                    userRecipes: {
                        id: number;
                        name: string | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                        serveUnit: string | null;
                        isUserCreated: boolean | null;
                        index: number | null;
                        serve: string | null;
                        note: string | null;
                        userPlanId: number | null;
                        dailyLogId: number | null;
                        mealIndex: number | null;
                        dailyMealId: number | null;
                        recipeIndex: number | null;
                        parentId: number | null;
                        isLog: boolean | null;
                    }[];
                    userIngredients: {
                        id: number;
                        name: string | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                        serveUnit: string | null;
                        isUserCreated: boolean | null;
                        ingredientId: number | null;
                        alternateId: number | null;
                        serve: string | null;
                        note: string | null;
                        userPlanId: number | null;
                        dailyLogId: number | null;
                        mealIndex: number | null;
                        dailyMealId: number | null;
                        recipeIndex: number | null;
                        ingredient: {
                            id: number;
                            name: string | null;
                            notes: string | null;
                            createdAt: Date;
                            updatedAt: Date | null;
                            userId: string | null;
                            favouriteAt: Date | null;
                            deletedAt: Date | null;
                            hiddenAt: Date | null;
                            isAusFood: boolean | null;
                            isAllStores: boolean | null;
                            serveSize: string | null;
                            serveUnit: string | null;
                            publicFoodKey: string | null;
                            classification: string | null;
                            foodName: string | null;
                            caloriesWFibre: string | null;
                            caloriesWOFibre: string | null;
                            protein: string | null;
                            fatTotal: string | null;
                            totalDietaryFibre: string | null;
                            totalSugars: string | null;
                            starch: string | null;
                            resistantStarch: string | null;
                            availableCarbohydrateWithoutSugarAlcohols: string | null;
                            availableCarbohydrateWithSugarAlcohols: string | null;
                            isUserCreated: boolean | null;
                            isSupplement: boolean | null;
                            isPrivate: boolean | null;
                            viewableBy: string | null;
                            intervale: string | null;
                        } | null;
                        alternateIngredient: {
                            id: number;
                            name: string | null;
                            notes: string | null;
                            createdAt: Date;
                            updatedAt: Date | null;
                            userId: string | null;
                            favouriteAt: Date | null;
                            deletedAt: Date | null;
                            hiddenAt: Date | null;
                            isAusFood: boolean | null;
                            isAllStores: boolean | null;
                            serveSize: string | null;
                            serveUnit: string | null;
                            publicFoodKey: string | null;
                            classification: string | null;
                            foodName: string | null;
                            caloriesWFibre: string | null;
                            caloriesWOFibre: string | null;
                            protein: string | null;
                            fatTotal: string | null;
                            totalDietaryFibre: string | null;
                            totalSugars: string | null;
                            starch: string | null;
                            resistantStarch: string | null;
                            availableCarbohydrateWithoutSugarAlcohols: string | null;
                            availableCarbohydrateWithSugarAlcohols: string | null;
                            isUserCreated: boolean | null;
                            isSupplement: boolean | null;
                            isPrivate: boolean | null;
                            viewableBy: string | null;
                            intervale: string | null;
                        } | null;
                    }[];
                }[];
                images: {
                    date: string;
                    id: number;
                    name: string;
                    image: string;
                    createdAt: Date;
                    userId: string;
                }[];
                settings: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date | null;
                    userId: string;
                    isHiit: boolean | null;
                    isLiss: boolean | null;
                    defaultWater: string | null;
                    defaultChartRange: string | null;
                    isPosing: boolean | null;
                    isBloodGlucose: boolean | null;
                    isSleep: boolean | null;
                    isSleepQuality: boolean | null;
                    isNap: boolean | null;
                    isWeightTraining: boolean | null;
                    isNotes: boolean | null;
                    isSteps: boolean | null;
                    isSauna: boolean | null;
                    isColdPlunge: boolean | null;
                };
                supplementStacks: {
                    id: number;
                    name: string | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                    userId: string;
                    time: string | null;
                    isTemplate: boolean | null;
                    supplements: {
                        id: number;
                        supplementId: number;
                        supplementStackId: number;
                        size: string | null;
                        unit: string | null;
                        supplement: {
                            id: number;
                            name: string | null;
                            notes: string | null;
                            createdAt: Date;
                            updatedAt: Date | null;
                            userId: string | null;
                            favouriteAt: Date | null;
                            deletedAt: Date | null;
                            hiddenAt: Date | null;
                            isAusFood: boolean | null;
                            isAllStores: boolean | null;
                            serveSize: string | null;
                            serveUnit: string | null;
                            publicFoodKey: string | null;
                            classification: string | null;
                            foodName: string | null;
                            caloriesWFibre: string | null;
                            caloriesWOFibre: string | null;
                            protein: string | null;
                            fatTotal: string | null;
                            totalDietaryFibre: string | null;
                            totalSugars: string | null;
                            starch: string | null;
                            resistantStarch: string | null;
                            availableCarbohydrateWithoutSugarAlcohols: string | null;
                            availableCarbohydrateWithSugarAlcohols: string | null;
                            isUserCreated: boolean | null;
                            isSupplement: boolean | null;
                            isPrivate: boolean | null;
                            viewableBy: string | null;
                            intervale: string | null;
                        };
                    }[];
                }[];
            } | undefined;
            meta: object;
        }>;
        getCurrentUser: _trpc_server.TRPCQueryProcedure<{
            input: {
                id: string;
            } | undefined;
            output: {
                id: string;
                name: string | null;
                firstName: string | null;
                lastName: string | null;
                clerkId: string | null;
                birthDate: Date | null;
                gender: string | null;
                address: string | null;
                notes: string | null;
                instagram: string | null;
                openLifter: string | null;
                phone: string | null;
                email: string | null;
                emailVerified: Date | null;
                currentPlanId: number | null;
                image: string | null;
                isFake: boolean | null;
                isTrainer: boolean | null;
                isRoot: boolean | null;
                isCreator: boolean | null;
                isAllTrainers: boolean | null;
                createdAt: Date;
                updatedAt: Date | null;
                roles: {
                    id: number;
                    name: string | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                    userId: string | null;
                }[];
                userPlans: {
                    id: number;
                    name: string;
                    notes: string;
                    image: string;
                    createdAt: Date;
                    updatedAt: Date | null;
                    description: string;
                    userId: string;
                    finishedAt: Date | null;
                    startAt: Date | null;
                    isActive: boolean | null;
                    numberOfMeals: number | null;
                    creatorId: string;
                    favouriteAt: Date | null;
                    deletedAt: Date | null;
                    hiddenAt: Date | null;
                    userMeals: {
                        id: number;
                        createdAt: Date;
                        updatedAt: Date | null;
                        protein: string | null;
                        calories: string | null;
                        note: string | null;
                        userPlanId: number;
                        mealIndex: number | null;
                        vegeCalories: string | null;
                        veges: string | null;
                        vegeNotes: string | null;
                        mealTitle: string | null;
                        targetProtein: string | null;
                        targetCalories: string | null;
                    }[];
                    userRecipes: {
                        id: number;
                        name: string | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                        serveUnit: string | null;
                        isUserCreated: boolean | null;
                        index: number | null;
                        serve: string | null;
                        note: string | null;
                        userPlanId: number | null;
                        dailyLogId: number | null;
                        mealIndex: number | null;
                        dailyMealId: number | null;
                        recipeIndex: number | null;
                        parentId: number | null;
                        isLog: boolean | null;
                    }[];
                    userIngredients: {
                        id: number;
                        name: string | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                        serveUnit: string | null;
                        isUserCreated: boolean | null;
                        ingredientId: number | null;
                        alternateId: number | null;
                        serve: string | null;
                        note: string | null;
                        userPlanId: number | null;
                        dailyLogId: number | null;
                        mealIndex: number | null;
                        dailyMealId: number | null;
                        recipeIndex: number | null;
                        ingredient: {
                            id: number;
                            name: string | null;
                            notes: string | null;
                            createdAt: Date;
                            updatedAt: Date | null;
                            userId: string | null;
                            favouriteAt: Date | null;
                            deletedAt: Date | null;
                            hiddenAt: Date | null;
                            isAusFood: boolean | null;
                            isAllStores: boolean | null;
                            serveSize: string | null;
                            serveUnit: string | null;
                            publicFoodKey: string | null;
                            classification: string | null;
                            foodName: string | null;
                            caloriesWFibre: string | null;
                            caloriesWOFibre: string | null;
                            protein: string | null;
                            fatTotal: string | null;
                            totalDietaryFibre: string | null;
                            totalSugars: string | null;
                            starch: string | null;
                            resistantStarch: string | null;
                            availableCarbohydrateWithoutSugarAlcohols: string | null;
                            availableCarbohydrateWithSugarAlcohols: string | null;
                            isUserCreated: boolean | null;
                            isSupplement: boolean | null;
                            isPrivate: boolean | null;
                            viewableBy: string | null;
                            intervale: string | null;
                        } | null;
                        alternateIngredient: {
                            id: number;
                            name: string | null;
                            notes: string | null;
                            createdAt: Date;
                            updatedAt: Date | null;
                            userId: string | null;
                            favouriteAt: Date | null;
                            deletedAt: Date | null;
                            hiddenAt: Date | null;
                            isAusFood: boolean | null;
                            isAllStores: boolean | null;
                            serveSize: string | null;
                            serveUnit: string | null;
                            publicFoodKey: string | null;
                            classification: string | null;
                            foodName: string | null;
                            caloriesWFibre: string | null;
                            caloriesWOFibre: string | null;
                            protein: string | null;
                            fatTotal: string | null;
                            totalDietaryFibre: string | null;
                            totalSugars: string | null;
                            starch: string | null;
                            resistantStarch: string | null;
                            availableCarbohydrateWithoutSugarAlcohols: string | null;
                            availableCarbohydrateWithSugarAlcohols: string | null;
                            isUserCreated: boolean | null;
                            isSupplement: boolean | null;
                            isPrivate: boolean | null;
                            viewableBy: string | null;
                            intervale: string | null;
                        } | null;
                    }[];
                }[];
                images: {
                    date: string;
                    id: number;
                    name: string;
                    image: string;
                    createdAt: Date;
                    userId: string;
                }[];
                settings: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date | null;
                    userId: string;
                    isHiit: boolean | null;
                    isLiss: boolean | null;
                    defaultWater: string | null;
                    defaultChartRange: string | null;
                    isPosing: boolean | null;
                    isBloodGlucose: boolean | null;
                    isSleep: boolean | null;
                    isSleepQuality: boolean | null;
                    isNap: boolean | null;
                    isWeightTraining: boolean | null;
                    isNotes: boolean | null;
                    isSteps: boolean | null;
                    isSauna: boolean | null;
                    isColdPlunge: boolean | null;
                };
                supplementStacks: {
                    id: number;
                    name: string | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                    userId: string;
                    time: string | null;
                    isTemplate: boolean | null;
                    supplements: {
                        id: number;
                        supplementId: number;
                        supplementStackId: number;
                        size: string | null;
                        unit: string | null;
                        supplement: {
                            id: number;
                            name: string | null;
                            notes: string | null;
                            createdAt: Date;
                            updatedAt: Date | null;
                            userId: string | null;
                            favouriteAt: Date | null;
                            deletedAt: Date | null;
                            hiddenAt: Date | null;
                            isAusFood: boolean | null;
                            isAllStores: boolean | null;
                            serveSize: string | null;
                            serveUnit: string | null;
                            publicFoodKey: string | null;
                            classification: string | null;
                            foodName: string | null;
                            caloriesWFibre: string | null;
                            caloriesWOFibre: string | null;
                            protein: string | null;
                            fatTotal: string | null;
                            totalDietaryFibre: string | null;
                            totalSugars: string | null;
                            starch: string | null;
                            resistantStarch: string | null;
                            availableCarbohydrateWithoutSugarAlcohols: string | null;
                            availableCarbohydrateWithSugarAlcohols: string | null;
                            isUserCreated: boolean | null;
                            isSupplement: boolean | null;
                            isPrivate: boolean | null;
                            viewableBy: string | null;
                            intervale: string | null;
                        };
                    }[];
                }[];
            } | null | undefined;
            meta: object;
        }>;
        isUser: _trpc_server.TRPCQueryProcedure<{
            input: void;
            output: ({
                id: string;
                name: string;
                email: string;
                isTrainer: boolean;
                isCreator: boolean;
                isAdmin: boolean;
            } & next_auth.User) | null;
            meta: object;
        }>;
        isCreator: _trpc_server.TRPCQueryProcedure<{
            input: void;
            output: {
                isCreator: boolean | null;
            } | null | undefined;
            meta: object;
        }>;
        isTrainer: _trpc_server.TRPCQueryProcedure<{
            input: void;
            output: {
                isTrainer: boolean | null;
            } | null | undefined;
            meta: object;
        }>;
        isRoot: _trpc_server.TRPCQueryProcedure<{
            input: void;
            output: {
                isRoot: boolean | null;
            } | null | undefined;
            meta: object;
        }>;
        isAdmin: _trpc_server.TRPCQueryProcedure<{
            input: void;
            output: boolean | null;
            meta: object;
        }>;
    }>>;
    ingredient: _trpc_server.TRPCBuiltRouter<{
        ctx: {
            headers: Headers;
            db: drizzle_orm_libsql.LibSQLDatabase<typeof ______db_schema> & {
                $client: _libsql_client.Client;
            };
            session: next_auth.Session | null;
        };
        meta: object;
        errorShape: {
            data: {
                zodError: zod.ZodFlattenedError<unknown, string> | null;
                code: _trpc_server.TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: _trpc_server.TRPC_ERROR_CODE_NUMBER;
        };
        transformer: true;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        getAll: _trpc_server.TRPCQueryProcedure<{
            input: void;
            output: {
                id: number;
                name: string | null;
                notes: string | null;
                createdAt: Date;
                updatedAt: Date | null;
                userId: string | null;
                favouriteAt: Date | null;
                deletedAt: Date | null;
                hiddenAt: Date | null;
                isAusFood: boolean | null;
                isAllStores: boolean | null;
                serveSize: string | null;
                serveUnit: string | null;
                publicFoodKey: string | null;
                classification: string | null;
                foodName: string | null;
                caloriesWFibre: string | null;
                caloriesWOFibre: string | null;
                protein: string | null;
                fatTotal: string | null;
                totalDietaryFibre: string | null;
                totalSugars: string | null;
                starch: string | null;
                resistantStarch: string | null;
                availableCarbohydrateWithoutSugarAlcohols: string | null;
                availableCarbohydrateWithSugarAlcohols: string | null;
                isUserCreated: boolean | null;
                isSupplement: boolean | null;
                isPrivate: boolean | null;
                viewableBy: string | null;
                intervale: string | null;
                user: {
                    id: string;
                    name: string | null;
                } | null;
                ingredientToGroceryStore: {
                    id: number;
                    createdAt: Date;
                    ingredientId: number | null;
                    groceryStoreId: number | null;
                    groceryStore: {
                        id: number;
                        name: string | null;
                        createdAt: Date;
                        location: string | null;
                    } | null;
                }[];
            }[];
            meta: object;
        }>;
        getAllFav: _trpc_server.TRPCQueryProcedure<{
            input: void;
            output: {
                id: number;
                name: string | null;
                notes: string | null;
                createdAt: Date;
                updatedAt: Date | null;
                userId: string | null;
                favouriteAt: Date | null;
                deletedAt: Date | null;
                hiddenAt: Date | null;
                isAusFood: boolean | null;
                isAllStores: boolean | null;
                serveSize: string | null;
                serveUnit: string | null;
                publicFoodKey: string | null;
                classification: string | null;
                foodName: string | null;
                caloriesWFibre: string | null;
                caloriesWOFibre: string | null;
                protein: string | null;
                fatTotal: string | null;
                totalDietaryFibre: string | null;
                totalSugars: string | null;
                starch: string | null;
                resistantStarch: string | null;
                availableCarbohydrateWithoutSugarAlcohols: string | null;
                availableCarbohydrateWithSugarAlcohols: string | null;
                isUserCreated: boolean | null;
                isSupplement: boolean | null;
                isPrivate: boolean | null;
                viewableBy: string | null;
                intervale: string | null;
                ingredientToGroceryStore: {
                    id: number;
                    createdAt: Date;
                    ingredientId: number | null;
                    groceryStoreId: number | null;
                    groceryStore: {
                        id: number;
                        name: string | null;
                        createdAt: Date;
                        location: string | null;
                    } | null;
                }[];
            }[];
            meta: object;
        }>;
        get: _trpc_server.TRPCQueryProcedure<{
            input: {
                id: number;
            };
            output: {
                id: number;
                name: string | null;
                notes: string | null;
                createdAt: Date;
                updatedAt: Date | null;
                userId: string | null;
                favouriteAt: Date | null;
                deletedAt: Date | null;
                hiddenAt: Date | null;
                isAusFood: boolean | null;
                isAllStores: boolean | null;
                serveSize: string | null;
                serveUnit: string | null;
                publicFoodKey: string | null;
                classification: string | null;
                foodName: string | null;
                caloriesWFibre: string | null;
                caloriesWOFibre: string | null;
                protein: string | null;
                fatTotal: string | null;
                totalDietaryFibre: string | null;
                totalSugars: string | null;
                starch: string | null;
                resistantStarch: string | null;
                availableCarbohydrateWithoutSugarAlcohols: string | null;
                availableCarbohydrateWithSugarAlcohols: string | null;
                isUserCreated: boolean | null;
                isSupplement: boolean | null;
                isPrivate: boolean | null;
                viewableBy: string | null;
                intervale: string | null;
                user: {
                    id: string;
                    name: string | null;
                } | null;
                ingredientToGroceryStore: {
                    id: number;
                    createdAt: Date;
                    ingredientId: number | null;
                    groceryStoreId: number | null;
                    groceryStore: {
                        id: number;
                        name: string | null;
                        createdAt: Date;
                        location: string | null;
                    } | null;
                }[];
            } | undefined;
            meta: object;
        }>;
        updateHiddenAt: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        deleteHiddenAt: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateFavourite: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        deleteFavourite: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        update: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
                name: string;
                serveSize: string;
                serveUnit: string;
                caloriesWFibre: string;
                caloriesWOFibre: string;
                protein: string;
                fatTotal: string;
                totalDietaryFibre: string;
                totalSugars: string;
                starch: string;
                resistantStarch: string;
                availableCarbohydrateWithoutSugarAlcohols: string;
                availableCarbohydrateWithSugarAlcohols: string;
                isAllStores: boolean;
                stores: string[];
            };
            output: {
                id: number;
            }[];
            meta: object;
        }>;
        create: _trpc_server.TRPCMutationProcedure<{
            input: {
                name: string;
                serveSize: string;
                serveUnit: string;
                caloriesWFibre: string;
                caloriesWOFibre: string;
                protein: string;
                fatTotal: string;
                totalDietaryFibre: string;
                totalSugars: string;
                starch: string;
                resistantStarch: string;
                availableCarbohydrateWithoutSugarAlcohols: string;
                availableCarbohydrateWithSugarAlcohols: string;
                isAllStores: boolean;
                stores: string[];
            };
            output: {
                id: number;
                name: string | null;
                serveSize: string | null;
                serveUnit: string | null;
                caloriesWFibre: string | null;
            }[];
            meta: object;
        }>;
        delete: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
    }>>;
    test: _trpc_server.TRPCBuiltRouter<{
        ctx: {
            headers: Headers;
            db: drizzle_orm_libsql.LibSQLDatabase<typeof ______db_schema> & {
                $client: _libsql_client.Client;
            };
            session: next_auth.Session | null;
        };
        meta: object;
        errorShape: {
            data: {
                zodError: zod.ZodFlattenedError<unknown, string> | null;
                code: _trpc_server.TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: _trpc_server.TRPC_ERROR_CODE_NUMBER;
        };
        transformer: true;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        createDBMap: _trpc_server.TRPCMutationProcedure<{
            input: void;
            output: boolean;
            meta: object;
        }>;
        generateGroceryStores: _trpc_server.TRPCMutationProcedure<{
            input: void;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        deleteAllIngredients: _trpc_server.TRPCMutationProcedure<{
            input: void;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        importAFCDLiquid: _trpc_server.TRPCMutationProcedure<{
            input: void;
            output: {
                id: number;
                publicFoodKey: string | null;
            }[];
            meta: object;
        }>;
        importAFCDSolid: _trpc_server.TRPCMutationProcedure<{
            input: void;
            output: {
                id: number;
                publicFoodKey: string | null;
            }[];
            meta: object;
        }>;
    }>>;
    groceryStore: _trpc_server.TRPCBuiltRouter<{
        ctx: {
            headers: Headers;
            db: drizzle_orm_libsql.LibSQLDatabase<typeof ______db_schema> & {
                $client: _libsql_client.Client;
            };
            session: next_auth.Session | null;
        };
        meta: object;
        errorShape: {
            data: {
                zodError: zod.ZodFlattenedError<unknown, string> | null;
                code: _trpc_server.TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: _trpc_server.TRPC_ERROR_CODE_NUMBER;
        };
        transformer: true;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        getAll: _trpc_server.TRPCQueryProcedure<{
            input: void;
            output: {
                id: number;
                name: string | null;
                createdAt: Date;
                location: string | null;
            }[];
            meta: object;
        }>;
        get: _trpc_server.TRPCQueryProcedure<{
            input: {
                id: number;
            };
            output: {
                id: number;
                name: string | null;
                createdAt: Date;
                location: string | null;
            } | undefined;
            meta: object;
        }>;
        create: _trpc_server.TRPCMutationProcedure<{
            input: {
                name: string;
                location: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        delete: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
    }>>;
    settings: _trpc_server.TRPCBuiltRouter<{
        ctx: {
            headers: Headers;
            db: drizzle_orm_libsql.LibSQLDatabase<typeof ______db_schema> & {
                $client: _libsql_client.Client;
            };
            session: next_auth.Session | null;
        };
        meta: object;
        errorShape: {
            data: {
                zodError: zod.ZodFlattenedError<unknown, string> | null;
                code: _trpc_server.TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: _trpc_server.TRPC_ERROR_CODE_NUMBER;
        };
        transformer: true;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        get: _trpc_server.TRPCQueryProcedure<{
            input: void;
            output: {
                id: number;
                isCaloriesWithFibre: boolean | null;
            } | undefined;
            meta: object;
        }>;
        updateCalories: _trpc_server.TRPCMutationProcedure<{
            input: boolean;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
    }>>;
    recipe: _trpc_server.TRPCBuiltRouter<{
        ctx: {
            headers: Headers;
            db: drizzle_orm_libsql.LibSQLDatabase<typeof ______db_schema> & {
                $client: _libsql_client.Client;
            };
            session: next_auth.Session | null;
        };
        meta: object;
        errorShape: {
            data: {
                zodError: zod.ZodFlattenedError<unknown, string> | null;
                code: _trpc_server.TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: _trpc_server.TRPC_ERROR_CODE_NUMBER;
        };
        transformer: true;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        getAll: _trpc_server.TRPCQueryProcedure<{
            input: void;
            output: {
                id: number;
                name: string;
                notes: string;
                image: string;
                createdAt: Date;
                updatedAt: Date | null;
                description: string;
                creatorId: string;
                favouriteAt: Date | null;
                deletedAt: Date | null;
                hiddenAt: Date | null;
                calories: number;
                isUserRecipe: boolean | null;
                isGlobal: boolean | null;
                recipeCategory: string;
                creator: {
                    id: string;
                    name: string | null;
                    firstName: string | null;
                    lastName: string | null;
                    clerkId: string | null;
                    birthDate: Date | null;
                    gender: string | null;
                    address: string | null;
                    notes: string | null;
                    instagram: string | null;
                    openLifter: string | null;
                    phone: string | null;
                    email: string | null;
                    emailVerified: Date | null;
                    password: string | null;
                    currentPlanId: number | null;
                    image: string | null;
                    isFake: boolean | null;
                    isTrainer: boolean | null;
                    isRoot: boolean | null;
                    isCreator: boolean | null;
                    isAllTrainers: boolean | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                };
                recipeToIngredient: {
                    id: number;
                    createdAt: Date;
                    serveSize: string;
                    serveUnit: string;
                    isUserCreated: boolean | null;
                    ingredientId: number;
                    recipeId: number;
                    index: number;
                    alternateId: number | null;
                    note: string | null;
                    ingredient: {
                        id: number;
                        name: string | null;
                        notes: string | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                        userId: string | null;
                        favouriteAt: Date | null;
                        deletedAt: Date | null;
                        hiddenAt: Date | null;
                        isAusFood: boolean | null;
                        isAllStores: boolean | null;
                        serveSize: string | null;
                        serveUnit: string | null;
                        publicFoodKey: string | null;
                        classification: string | null;
                        foodName: string | null;
                        caloriesWFibre: string | null;
                        caloriesWOFibre: string | null;
                        protein: string | null;
                        fatTotal: string | null;
                        totalDietaryFibre: string | null;
                        totalSugars: string | null;
                        starch: string | null;
                        resistantStarch: string | null;
                        availableCarbohydrateWithoutSugarAlcohols: string | null;
                        availableCarbohydrateWithSugarAlcohols: string | null;
                        isUserCreated: boolean | null;
                        isSupplement: boolean | null;
                        isPrivate: boolean | null;
                        viewableBy: string | null;
                        intervale: string | null;
                        ingredientToGroceryStore: {
                            id: number;
                            createdAt: Date;
                            ingredientId: number | null;
                            groceryStoreId: number | null;
                            groceryStore: {
                                id: number;
                                name: string | null;
                                createdAt: Date;
                                location: string | null;
                            } | null;
                        }[];
                    };
                    alternateIngredient: {
                        id: number;
                        name: string | null;
                        notes: string | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                        userId: string | null;
                        favouriteAt: Date | null;
                        deletedAt: Date | null;
                        hiddenAt: Date | null;
                        isAusFood: boolean | null;
                        isAllStores: boolean | null;
                        serveSize: string | null;
                        serveUnit: string | null;
                        publicFoodKey: string | null;
                        classification: string | null;
                        foodName: string | null;
                        caloriesWFibre: string | null;
                        caloriesWOFibre: string | null;
                        protein: string | null;
                        fatTotal: string | null;
                        totalDietaryFibre: string | null;
                        totalSugars: string | null;
                        starch: string | null;
                        resistantStarch: string | null;
                        availableCarbohydrateWithoutSugarAlcohols: string | null;
                        availableCarbohydrateWithSugarAlcohols: string | null;
                        isUserCreated: boolean | null;
                        isSupplement: boolean | null;
                        isPrivate: boolean | null;
                        viewableBy: string | null;
                        intervale: string | null;
                    } | null;
                }[];
            }[];
            meta: object;
        }>;
        getAllUserCreated: _trpc_server.TRPCQueryProcedure<{
            input: {
                userId: string;
            };
            output: {
                id: number;
                name: string;
                notes: string;
                image: string;
                createdAt: Date;
                updatedAt: Date | null;
                description: string;
                creatorId: string;
                favouriteAt: Date | null;
                deletedAt: Date | null;
                hiddenAt: Date | null;
                calories: number;
                isUserRecipe: boolean | null;
                isGlobal: boolean | null;
                recipeCategory: string;
                creator: {
                    id: string;
                    name: string | null;
                    firstName: string | null;
                    lastName: string | null;
                    clerkId: string | null;
                    birthDate: Date | null;
                    gender: string | null;
                    address: string | null;
                    notes: string | null;
                    instagram: string | null;
                    openLifter: string | null;
                    phone: string | null;
                    email: string | null;
                    emailVerified: Date | null;
                    password: string | null;
                    currentPlanId: number | null;
                    image: string | null;
                    isFake: boolean | null;
                    isTrainer: boolean | null;
                    isRoot: boolean | null;
                    isCreator: boolean | null;
                    isAllTrainers: boolean | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                };
                recipeToIngredient: {
                    id: number;
                    createdAt: Date;
                    serveSize: string;
                    serveUnit: string;
                    isUserCreated: boolean | null;
                    ingredientId: number;
                    recipeId: number;
                    index: number;
                    alternateId: number | null;
                    note: string | null;
                    ingredient: {
                        id: number;
                        name: string | null;
                        notes: string | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                        userId: string | null;
                        favouriteAt: Date | null;
                        deletedAt: Date | null;
                        hiddenAt: Date | null;
                        isAusFood: boolean | null;
                        isAllStores: boolean | null;
                        serveSize: string | null;
                        serveUnit: string | null;
                        publicFoodKey: string | null;
                        classification: string | null;
                        foodName: string | null;
                        caloriesWFibre: string | null;
                        caloriesWOFibre: string | null;
                        protein: string | null;
                        fatTotal: string | null;
                        totalDietaryFibre: string | null;
                        totalSugars: string | null;
                        starch: string | null;
                        resistantStarch: string | null;
                        availableCarbohydrateWithoutSugarAlcohols: string | null;
                        availableCarbohydrateWithSugarAlcohols: string | null;
                        isUserCreated: boolean | null;
                        isSupplement: boolean | null;
                        isPrivate: boolean | null;
                        viewableBy: string | null;
                        intervale: string | null;
                        ingredientToGroceryStore: {
                            id: number;
                            createdAt: Date;
                            ingredientId: number | null;
                            groceryStoreId: number | null;
                            groceryStore: {
                                id: number;
                                name: string | null;
                                createdAt: Date;
                                location: string | null;
                            } | null;
                        }[];
                    };
                }[];
            }[];
            meta: object;
        }>;
        get: _trpc_server.TRPCQueryProcedure<{
            input: {
                id: number;
            };
            output: {
                id: number;
                name: string;
                notes: string;
                image: string;
                createdAt: Date;
                updatedAt: Date | null;
                description: string;
                creatorId: string;
                favouriteAt: Date | null;
                deletedAt: Date | null;
                hiddenAt: Date | null;
                calories: number;
                isUserRecipe: boolean | null;
                isGlobal: boolean | null;
                recipeCategory: string;
                creator: {
                    id: string;
                    name: string | null;
                    firstName: string | null;
                    lastName: string | null;
                    clerkId: string | null;
                    birthDate: Date | null;
                    gender: string | null;
                    address: string | null;
                    notes: string | null;
                    instagram: string | null;
                    openLifter: string | null;
                    phone: string | null;
                    email: string | null;
                    emailVerified: Date | null;
                    password: string | null;
                    currentPlanId: number | null;
                    image: string | null;
                    isFake: boolean | null;
                    isTrainer: boolean | null;
                    isRoot: boolean | null;
                    isCreator: boolean | null;
                    isAllTrainers: boolean | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                };
                recipeToIngredient: {
                    id: number;
                    createdAt: Date;
                    serveSize: string;
                    serveUnit: string;
                    isUserCreated: boolean | null;
                    ingredientId: number;
                    recipeId: number;
                    index: number;
                    alternateId: number | null;
                    note: string | null;
                    ingredient: {
                        id: number;
                        name: string | null;
                        notes: string | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                        userId: string | null;
                        favouriteAt: Date | null;
                        deletedAt: Date | null;
                        hiddenAt: Date | null;
                        isAusFood: boolean | null;
                        isAllStores: boolean | null;
                        serveSize: string | null;
                        serveUnit: string | null;
                        publicFoodKey: string | null;
                        classification: string | null;
                        foodName: string | null;
                        caloriesWFibre: string | null;
                        caloriesWOFibre: string | null;
                        protein: string | null;
                        fatTotal: string | null;
                        totalDietaryFibre: string | null;
                        totalSugars: string | null;
                        starch: string | null;
                        resistantStarch: string | null;
                        availableCarbohydrateWithoutSugarAlcohols: string | null;
                        availableCarbohydrateWithSugarAlcohols: string | null;
                        isUserCreated: boolean | null;
                        isSupplement: boolean | null;
                        isPrivate: boolean | null;
                        viewableBy: string | null;
                        intervale: string | null;
                        ingredientToGroceryStore: {
                            id: number;
                            createdAt: Date;
                            ingredientId: number | null;
                            groceryStoreId: number | null;
                            groceryStore: {
                                id: number;
                                name: string | null;
                                createdAt: Date;
                                location: string | null;
                            } | null;
                        }[];
                    };
                }[];
            } | undefined;
            meta: object;
        }>;
        update: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
                name: string;
                description: string;
                image: string;
                notes: string;
                recipeCategory: string;
                calories: number;
                ingredients: {
                    ingredientId: number;
                    alternateId: string;
                    note: string;
                    serveSize: string;
                    serveUnit: string;
                    index: number;
                    isAlternate?: boolean | undefined;
                }[];
                isUserRecipe?: boolean | undefined;
            };
            output: {
                id: number;
            }[] | {
                res: {
                    id: number;
                }[];
                ingredientsRes: {
                    id: number;
                }[];
            };
            meta: object;
        }>;
        duplicate: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: {
                id: number;
            }[] | {
                res: {
                    id: number;
                }[];
                ingredientsRes: {
                    id: number;
                }[];
            } | undefined;
            meta: object;
        }>;
        create: _trpc_server.TRPCMutationProcedure<{
            input: {
                name: string;
                description: string;
                image: string;
                notes: string;
                recipeCategory: string;
                calories: number;
                ingredients: {
                    ingredientId: number;
                    alternateId: string;
                    note: string;
                    serveSize: string;
                    serveUnit: string;
                    index: number;
                }[];
                isUserRecipe?: boolean | undefined;
            };
            output: {
                id: number;
            }[] | {
                res: {
                    id: number;
                }[];
                ingredientsRes: {
                    id: number;
                }[];
            };
            meta: object;
        }>;
        delete: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        deleteAll: _trpc_server.TRPCMutationProcedure<{
            input: void;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
    }>>;
    plan: _trpc_server.TRPCBuiltRouter<{
        ctx: {
            headers: Headers;
            db: drizzle_orm_libsql.LibSQLDatabase<typeof ______db_schema> & {
                $client: _libsql_client.Client;
            };
            session: next_auth.Session | null;
        };
        meta: object;
        errorShape: {
            data: {
                zodError: zod.ZodFlattenedError<unknown, string> | null;
                code: _trpc_server.TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: _trpc_server.TRPC_ERROR_CODE_NUMBER;
        };
        transformer: true;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        getAllSimple: _trpc_server.TRPCQueryProcedure<{
            input: void;
            output: {
                id: number;
                name: string | null;
                notes: string | null;
                image: string | null;
                createdAt: Date;
                updatedAt: Date | null;
                description: string | null;
                numberOfMeals: number | null;
                creatorId: string | null;
                favouriteAt: Date | null;
                deletedAt: Date | null;
                hiddenAt: Date | null;
                isGlobal: boolean | null;
                planCategory: string | null;
                creator: {
                    id: string;
                    name: string | null;
                    firstName: string | null;
                    lastName: string | null;
                    clerkId: string | null;
                    birthDate: Date | null;
                    gender: string | null;
                    address: string | null;
                    notes: string | null;
                    instagram: string | null;
                    openLifter: string | null;
                    phone: string | null;
                    email: string | null;
                    emailVerified: Date | null;
                    password: string | null;
                    currentPlanId: number | null;
                    image: string | null;
                    isFake: boolean | null;
                    isTrainer: boolean | null;
                    isRoot: boolean | null;
                    isCreator: boolean | null;
                    isAllTrainers: boolean | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                } | null;
            }[];
            meta: object;
        }>;
        getAll: _trpc_server.TRPCQueryProcedure<{
            input: void;
            output: {
                id: number;
                name: string | null;
                notes: string | null;
                image: string | null;
                createdAt: Date;
                updatedAt: Date | null;
                description: string | null;
                numberOfMeals: number | null;
                creatorId: string | null;
                favouriteAt: Date | null;
                deletedAt: Date | null;
                hiddenAt: Date | null;
                isGlobal: boolean | null;
                planCategory: string | null;
                creator: {
                    id: string;
                    name: string | null;
                    firstName: string | null;
                    lastName: string | null;
                    clerkId: string | null;
                    birthDate: Date | null;
                    gender: string | null;
                    address: string | null;
                    notes: string | null;
                    instagram: string | null;
                    openLifter: string | null;
                    phone: string | null;
                    email: string | null;
                    emailVerified: Date | null;
                    password: string | null;
                    currentPlanId: number | null;
                    image: string | null;
                    isFake: boolean | null;
                    isTrainer: boolean | null;
                    isRoot: boolean | null;
                    isCreator: boolean | null;
                    isAllTrainers: boolean | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                } | null;
                meals: {
                    id: number;
                    name: string | null;
                    notes: string | null;
                    image: string | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                    description: string | null;
                    creatorId: string | null;
                    favouriteAt: Date | null;
                    deletedAt: Date | null;
                    hiddenAt: Date | null;
                    calories: string | null;
                    mealIndex: number | null;
                    vegeCalories: string | null;
                    planId: number | null;
                    mealCategory: string | null;
                    vegeNotes: string | null;
                    vege: string | null;
                    mealToRecipe: {
                        id: number;
                        createdAt: Date;
                        recipeId: number | null;
                        index: number;
                        note: string | null;
                        mealId: number | null;
                        recipe: {
                            id: number;
                            name: string;
                            notes: string;
                            image: string;
                            createdAt: Date;
                            updatedAt: Date | null;
                            description: string;
                            creatorId: string;
                            favouriteAt: Date | null;
                            deletedAt: Date | null;
                            hiddenAt: Date | null;
                            calories: number;
                            isUserRecipe: boolean | null;
                            isGlobal: boolean | null;
                            recipeCategory: string;
                            recipeToIngredient: {
                                id: number;
                                createdAt: Date;
                                serveSize: string;
                                serveUnit: string;
                                isUserCreated: boolean | null;
                                ingredientId: number;
                                recipeId: number;
                                index: number;
                                alternateId: number | null;
                                note: string | null;
                                ingredient: {
                                    id: number;
                                    name: string | null;
                                    notes: string | null;
                                    createdAt: Date;
                                    updatedAt: Date | null;
                                    userId: string | null;
                                    favouriteAt: Date | null;
                                    deletedAt: Date | null;
                                    hiddenAt: Date | null;
                                    isAusFood: boolean | null;
                                    isAllStores: boolean | null;
                                    serveSize: string | null;
                                    serveUnit: string | null;
                                    publicFoodKey: string | null;
                                    classification: string | null;
                                    foodName: string | null;
                                    caloriesWFibre: string | null;
                                    caloriesWOFibre: string | null;
                                    protein: string | null;
                                    fatTotal: string | null;
                                    totalDietaryFibre: string | null;
                                    totalSugars: string | null;
                                    starch: string | null;
                                    resistantStarch: string | null;
                                    availableCarbohydrateWithoutSugarAlcohols: string | null;
                                    availableCarbohydrateWithSugarAlcohols: string | null;
                                    isUserCreated: boolean | null;
                                    isSupplement: boolean | null;
                                    isPrivate: boolean | null;
                                    viewableBy: string | null;
                                    intervale: string | null;
                                };
                                alternateIngredient: {
                                    id: number;
                                    name: string | null;
                                    notes: string | null;
                                    createdAt: Date;
                                    updatedAt: Date | null;
                                    userId: string | null;
                                    favouriteAt: Date | null;
                                    deletedAt: Date | null;
                                    hiddenAt: Date | null;
                                    isAusFood: boolean | null;
                                    isAllStores: boolean | null;
                                    serveSize: string | null;
                                    serveUnit: string | null;
                                    publicFoodKey: string | null;
                                    classification: string | null;
                                    foodName: string | null;
                                    caloriesWFibre: string | null;
                                    caloriesWOFibre: string | null;
                                    protein: string | null;
                                    fatTotal: string | null;
                                    totalDietaryFibre: string | null;
                                    totalSugars: string | null;
                                    starch: string | null;
                                    resistantStarch: string | null;
                                    availableCarbohydrateWithoutSugarAlcohols: string | null;
                                    availableCarbohydrateWithSugarAlcohols: string | null;
                                    isUserCreated: boolean | null;
                                    isSupplement: boolean | null;
                                    isPrivate: boolean | null;
                                    viewableBy: string | null;
                                    intervale: string | null;
                                } | null;
                            }[];
                        } | null;
                    }[];
                    mealToVegeStack: {
                        id: number;
                        createdAt: Date;
                        calories: string | null;
                        note: string | null;
                        mealId: number | null;
                        vegeStackId: number | null;
                        vegeStack: {
                            id: number;
                            name: string | null;
                            notes: string | null;
                            createdAt: Date;
                            updatedAt: Date | null;
                            calories: string | null;
                            veges: string | null;
                        } | null;
                    }[];
                }[];
            }[];
            meta: object;
        }>;
        get: _trpc_server.TRPCQueryProcedure<{
            input: number;
            output: {
                id: number;
                name: string | null;
                notes: string | null;
                image: string | null;
                createdAt: Date;
                updatedAt: Date | null;
                description: string | null;
                numberOfMeals: number | null;
                creatorId: string | null;
                favouriteAt: Date | null;
                deletedAt: Date | null;
                hiddenAt: Date | null;
                isGlobal: boolean | null;
                planCategory: string | null;
                creator: {
                    id: string;
                    name: string | null;
                    firstName: string | null;
                    lastName: string | null;
                    clerkId: string | null;
                    birthDate: Date | null;
                    gender: string | null;
                    address: string | null;
                    notes: string | null;
                    instagram: string | null;
                    openLifter: string | null;
                    phone: string | null;
                    email: string | null;
                    emailVerified: Date | null;
                    password: string | null;
                    currentPlanId: number | null;
                    image: string | null;
                    isFake: boolean | null;
                    isTrainer: boolean | null;
                    isRoot: boolean | null;
                    isCreator: boolean | null;
                    isAllTrainers: boolean | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                } | null;
                meals: {
                    id: number;
                    name: string | null;
                    notes: string | null;
                    image: string | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                    description: string | null;
                    creatorId: string | null;
                    favouriteAt: Date | null;
                    deletedAt: Date | null;
                    hiddenAt: Date | null;
                    calories: string | null;
                    mealIndex: number | null;
                    vegeCalories: string | null;
                    planId: number | null;
                    mealCategory: string | null;
                    vegeNotes: string | null;
                    vege: string | null;
                    mealToRecipe: {
                        id: number;
                        createdAt: Date;
                        recipeId: number | null;
                        index: number;
                        note: string | null;
                        mealId: number | null;
                        recipe: {
                            id: number;
                            name: string;
                            notes: string;
                            image: string;
                            createdAt: Date;
                            updatedAt: Date | null;
                            description: string;
                            creatorId: string;
                            favouriteAt: Date | null;
                            deletedAt: Date | null;
                            hiddenAt: Date | null;
                            calories: number;
                            isUserRecipe: boolean | null;
                            isGlobal: boolean | null;
                            recipeCategory: string;
                            recipeToIngredient: {
                                id: number;
                                createdAt: Date;
                                serveSize: string;
                                serveUnit: string;
                                isUserCreated: boolean | null;
                                ingredientId: number;
                                recipeId: number;
                                index: number;
                                alternateId: number | null;
                                note: string | null;
                                ingredient: {
                                    id: number;
                                    name: string | null;
                                    notes: string | null;
                                    createdAt: Date;
                                    updatedAt: Date | null;
                                    userId: string | null;
                                    favouriteAt: Date | null;
                                    deletedAt: Date | null;
                                    hiddenAt: Date | null;
                                    isAusFood: boolean | null;
                                    isAllStores: boolean | null;
                                    serveSize: string | null;
                                    serveUnit: string | null;
                                    publicFoodKey: string | null;
                                    classification: string | null;
                                    foodName: string | null;
                                    caloriesWFibre: string | null;
                                    caloriesWOFibre: string | null;
                                    protein: string | null;
                                    fatTotal: string | null;
                                    totalDietaryFibre: string | null;
                                    totalSugars: string | null;
                                    starch: string | null;
                                    resistantStarch: string | null;
                                    availableCarbohydrateWithoutSugarAlcohols: string | null;
                                    availableCarbohydrateWithSugarAlcohols: string | null;
                                    isUserCreated: boolean | null;
                                    isSupplement: boolean | null;
                                    isPrivate: boolean | null;
                                    viewableBy: string | null;
                                    intervale: string | null;
                                    ingredientToGroceryStore: {
                                        id: number;
                                        createdAt: Date;
                                        ingredientId: number | null;
                                        groceryStoreId: number | null;
                                        groceryStore: {
                                            id: number;
                                            name: string | null;
                                            createdAt: Date;
                                            location: string | null;
                                        } | null;
                                    }[];
                                };
                                alternateIngredient: {
                                    id: number;
                                    name: string | null;
                                    notes: string | null;
                                    createdAt: Date;
                                    updatedAt: Date | null;
                                    userId: string | null;
                                    favouriteAt: Date | null;
                                    deletedAt: Date | null;
                                    hiddenAt: Date | null;
                                    isAusFood: boolean | null;
                                    isAllStores: boolean | null;
                                    serveSize: string | null;
                                    serveUnit: string | null;
                                    publicFoodKey: string | null;
                                    classification: string | null;
                                    foodName: string | null;
                                    caloriesWFibre: string | null;
                                    caloriesWOFibre: string | null;
                                    protein: string | null;
                                    fatTotal: string | null;
                                    totalDietaryFibre: string | null;
                                    totalSugars: string | null;
                                    starch: string | null;
                                    resistantStarch: string | null;
                                    availableCarbohydrateWithoutSugarAlcohols: string | null;
                                    availableCarbohydrateWithSugarAlcohols: string | null;
                                    isUserCreated: boolean | null;
                                    isSupplement: boolean | null;
                                    isPrivate: boolean | null;
                                    viewableBy: string | null;
                                    intervale: string | null;
                                } | null;
                            }[];
                        } | null;
                    }[];
                    mealToVegeStack: {
                        id: number;
                        createdAt: Date;
                        calories: string | null;
                        note: string | null;
                        mealId: number | null;
                        vegeStackId: number | null;
                        vegeStack: {
                            id: number;
                            name: string | null;
                            notes: string | null;
                            createdAt: Date;
                            updatedAt: Date | null;
                            calories: string | null;
                            veges: string | null;
                        } | null;
                    }[];
                }[];
            } | undefined;
            meta: object;
        }>;
        update: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
                name: string;
                description: string;
                image: string;
                notes: string;
                planCategory: string;
                numberOfMeals: number;
                meals: {
                    mealIndex: number;
                    mealTitle: string;
                    calories: string;
                    vegeCalories: string;
                    vegeNotes: string;
                    vege: string;
                    note: string;
                    recipes: {
                        recipeId: number;
                        note: string;
                    }[];
                }[];
            };
            output: {
                id: number;
            }[] | {
                res: {
                    id: number;
                }[];
            };
            meta: object;
        }>;
        saveAsPlan: _trpc_server.TRPCMutationProcedure<{
            input: {
                name: string;
                description: string;
                image: string;
                notes: string;
                planCategory: string;
                numberOfMeals: number;
                meals: {
                    mealIndex: number;
                    mealTitle: string;
                    calories: string;
                    vegeCalories: string;
                    vegeNotes: string;
                    vege: string;
                    note: string;
                    recipes: {
                        id: number;
                        note: string;
                        name: string;
                        calories: string;
                        ingredients: {
                            ingredientId: number;
                            alternateId: number | null;
                            name: string;
                            serve: string;
                            serveUnit: string;
                            note: string;
                        }[];
                    }[];
                }[];
            };
            output: {
                id: number;
            }[] | {
                res: {
                    id: number;
                }[];
            };
            meta: object;
        }>;
        create: _trpc_server.TRPCMutationProcedure<{
            input: {
                name: string;
                description: string;
                image: string;
                notes: string;
                planCategory: string;
                numberOfMeals: number;
                meals: {
                    mealIndex: number;
                    mealTitle: string;
                    calories: string;
                    vegeCalories: string;
                    vegeNotes: string;
                    vege: string;
                    note: string;
                    recipes: {
                        recipeId: number;
                        note: string;
                    }[];
                }[];
            };
            output: {
                id: number;
            }[] | {
                res: {
                    id: number;
                }[];
            };
            meta: object;
        }>;
        delete: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        deleteAll: _trpc_server.TRPCMutationProcedure<{
            input: void;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
    }>>;
    vege: _trpc_server.TRPCBuiltRouter<{
        ctx: {
            headers: Headers;
            db: drizzle_orm_libsql.LibSQLDatabase<typeof ______db_schema> & {
                $client: _libsql_client.Client;
            };
            session: next_auth.Session | null;
        };
        meta: object;
        errorShape: {
            data: {
                zodError: zod.ZodFlattenedError<unknown, string> | null;
                code: _trpc_server.TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: _trpc_server.TRPC_ERROR_CODE_NUMBER;
        };
        transformer: true;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        getAll: _trpc_server.TRPCQueryProcedure<{
            input: void;
            output: {
                id: number;
                name: string | null;
                notes: string | null;
                createdAt: Date;
                updatedAt: Date | null;
                calories: string | null;
                veges: string | null;
            }[];
            meta: object;
        }>;
        get: _trpc_server.TRPCQueryProcedure<{
            input: {
                id: number;
            };
            output: {
                id: number;
                name: string | null;
                notes: string | null;
                createdAt: Date;
                updatedAt: Date | null;
                calories: string | null;
                veges: string | null;
            } | undefined;
            meta: object;
        }>;
        create: _trpc_server.TRPCMutationProcedure<{
            input: {
                veges: string;
                notes: string;
                calories: string;
                name: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        delete: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        deleteAll: _trpc_server.TRPCMutationProcedure<{
            input: void;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
    }>>;
    meal: _trpc_server.TRPCBuiltRouter<{
        ctx: {
            headers: Headers;
            db: drizzle_orm_libsql.LibSQLDatabase<typeof ______db_schema> & {
                $client: _libsql_client.Client;
            };
            session: next_auth.Session | null;
        };
        meta: object;
        errorShape: {
            data: {
                zodError: zod.ZodFlattenedError<unknown, string> | null;
                code: _trpc_server.TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: _trpc_server.TRPC_ERROR_CODE_NUMBER;
        };
        transformer: true;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        getAll: _trpc_server.TRPCQueryProcedure<{
            input: void;
            output: {
                id: number;
                name: string | null;
                notes: string | null;
                image: string | null;
                createdAt: Date;
                updatedAt: Date | null;
                description: string | null;
                creatorId: string | null;
                favouriteAt: Date | null;
                deletedAt: Date | null;
                hiddenAt: Date | null;
                calories: string | null;
                mealIndex: number | null;
                vegeCalories: string | null;
                planId: number | null;
                mealCategory: string | null;
                vegeNotes: string | null;
                vege: string | null;
                mealToRecipe: {
                    id: number;
                    createdAt: Date;
                    recipeId: number | null;
                    index: number;
                    note: string | null;
                    mealId: number | null;
                    recipe: {
                        id: number;
                        name: string;
                        notes: string;
                        image: string;
                        createdAt: Date;
                        updatedAt: Date | null;
                        description: string;
                        creatorId: string;
                        favouriteAt: Date | null;
                        deletedAt: Date | null;
                        hiddenAt: Date | null;
                        calories: number;
                        isUserRecipe: boolean | null;
                        isGlobal: boolean | null;
                        recipeCategory: string;
                        recipeToIngredient: {
                            id: number;
                            createdAt: Date;
                            serveSize: string;
                            serveUnit: string;
                            isUserCreated: boolean | null;
                            ingredientId: number;
                            recipeId: number;
                            index: number;
                            alternateId: number | null;
                            note: string | null;
                            ingredient: {
                                id: number;
                                name: string | null;
                                notes: string | null;
                                createdAt: Date;
                                updatedAt: Date | null;
                                userId: string | null;
                                favouriteAt: Date | null;
                                deletedAt: Date | null;
                                hiddenAt: Date | null;
                                isAusFood: boolean | null;
                                isAllStores: boolean | null;
                                serveSize: string | null;
                                serveUnit: string | null;
                                publicFoodKey: string | null;
                                classification: string | null;
                                foodName: string | null;
                                caloriesWFibre: string | null;
                                caloriesWOFibre: string | null;
                                protein: string | null;
                                fatTotal: string | null;
                                totalDietaryFibre: string | null;
                                totalSugars: string | null;
                                starch: string | null;
                                resistantStarch: string | null;
                                availableCarbohydrateWithoutSugarAlcohols: string | null;
                                availableCarbohydrateWithSugarAlcohols: string | null;
                                isUserCreated: boolean | null;
                                isSupplement: boolean | null;
                                isPrivate: boolean | null;
                                viewableBy: string | null;
                                intervale: string | null;
                                ingredientToGroceryStore: {
                                    id: number;
                                    createdAt: Date;
                                    ingredientId: number | null;
                                    groceryStoreId: number | null;
                                    groceryStore: {
                                        id: number;
                                        name: string | null;
                                        createdAt: Date;
                                        location: string | null;
                                    } | null;
                                }[];
                            };
                        }[];
                    } | null;
                }[];
                mealToVegeStack: {
                    id: number;
                    createdAt: Date;
                    calories: string | null;
                    note: string | null;
                    mealId: number | null;
                    vegeStackId: number | null;
                    vegeStack: {
                        id: number;
                        name: string | null;
                        notes: string | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                        calories: string | null;
                        veges: string | null;
                    } | null;
                }[];
            }[];
            meta: object;
        }>;
        get: _trpc_server.TRPCQueryProcedure<{
            input: {
                id: number;
            };
            output: {
                id: number;
                name: string | null;
                notes: string | null;
                image: string | null;
                createdAt: Date;
                updatedAt: Date | null;
                description: string | null;
                creatorId: string | null;
                favouriteAt: Date | null;
                deletedAt: Date | null;
                hiddenAt: Date | null;
                calories: string | null;
                mealIndex: number | null;
                vegeCalories: string | null;
                planId: number | null;
                mealCategory: string | null;
                vegeNotes: string | null;
                vege: string | null;
                mealToRecipe: {
                    id: number;
                    createdAt: Date;
                    recipeId: number | null;
                    index: number;
                    note: string | null;
                    mealId: number | null;
                    recipe: {
                        id: number;
                        name: string;
                        notes: string;
                        image: string;
                        createdAt: Date;
                        updatedAt: Date | null;
                        description: string;
                        creatorId: string;
                        favouriteAt: Date | null;
                        deletedAt: Date | null;
                        hiddenAt: Date | null;
                        calories: number;
                        isUserRecipe: boolean | null;
                        isGlobal: boolean | null;
                        recipeCategory: string;
                        recipeToIngredient: {
                            id: number;
                            createdAt: Date;
                            serveSize: string;
                            serveUnit: string;
                            isUserCreated: boolean | null;
                            ingredientId: number;
                            recipeId: number;
                            index: number;
                            alternateId: number | null;
                            note: string | null;
                            ingredient: {
                                id: number;
                                name: string | null;
                                notes: string | null;
                                createdAt: Date;
                                updatedAt: Date | null;
                                userId: string | null;
                                favouriteAt: Date | null;
                                deletedAt: Date | null;
                                hiddenAt: Date | null;
                                isAusFood: boolean | null;
                                isAllStores: boolean | null;
                                serveSize: string | null;
                                serveUnit: string | null;
                                publicFoodKey: string | null;
                                classification: string | null;
                                foodName: string | null;
                                caloriesWFibre: string | null;
                                caloriesWOFibre: string | null;
                                protein: string | null;
                                fatTotal: string | null;
                                totalDietaryFibre: string | null;
                                totalSugars: string | null;
                                starch: string | null;
                                resistantStarch: string | null;
                                availableCarbohydrateWithoutSugarAlcohols: string | null;
                                availableCarbohydrateWithSugarAlcohols: string | null;
                                isUserCreated: boolean | null;
                                isSupplement: boolean | null;
                                isPrivate: boolean | null;
                                viewableBy: string | null;
                                intervale: string | null;
                                ingredientToGroceryStore: {
                                    id: number;
                                    createdAt: Date;
                                    ingredientId: number | null;
                                    groceryStoreId: number | null;
                                    groceryStore: {
                                        id: number;
                                        name: string | null;
                                        createdAt: Date;
                                        location: string | null;
                                    } | null;
                                }[];
                            };
                        }[];
                    } | null;
                }[];
                mealToVegeStack: {
                    id: number;
                    createdAt: Date;
                    calories: string | null;
                    note: string | null;
                    mealId: number | null;
                    vegeStackId: number | null;
                    vegeStack: {
                        id: number;
                        name: string | null;
                        notes: string | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                        calories: string | null;
                        veges: string | null;
                    } | null;
                }[];
            } | undefined;
            meta: object;
        }>;
        create: _trpc_server.TRPCMutationProcedure<{
            input: {
                name: string;
                description: string;
                image: string;
                notes: string;
                mealCategory: string;
                recipes: {
                    recipeId: number;
                    note: string;
                    index: number;
                }[];
                veges?: {
                    vegeStackId: number;
                    note: string;
                    calories: string;
                } | undefined;
            };
            output: {
                id: number;
            }[] | {
                res: {
                    id: number;
                }[];
                recipeRes: {
                    id: number;
                }[];
            };
            meta: object;
        }>;
        update: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
                name: string;
                description: string;
                image: string;
                notes: string;
                mealCategory: string;
                recipes: {
                    recipeId: number;
                    note: string;
                    index: number;
                }[];
                veges?: {
                    vegeStackId: number;
                    note: string;
                    calories: string;
                } | undefined;
            };
            output: {
                res: _libsql_client.ResultSet;
                recipeRes: {
                    id: number;
                }[];
            };
            meta: object;
        }>;
        updateFavourite: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        deleteFavourite: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        delete: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        deleteAll: _trpc_server.TRPCMutationProcedure<{
            input: void;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
    }>>;
    userPlan: _trpc_server.TRPCBuiltRouter<{
        ctx: {
            headers: Headers;
            db: drizzle_orm_libsql.LibSQLDatabase<typeof ______db_schema> & {
                $client: _libsql_client.Client;
            };
            session: next_auth.Session | null;
        };
        meta: object;
        errorShape: {
            data: {
                zodError: zod.ZodFlattenedError<unknown, string> | null;
                code: _trpc_server.TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: _trpc_server.TRPC_ERROR_CODE_NUMBER;
        };
        transformer: true;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        delete: _trpc_server.TRPCMutationProcedure<{
            input: number;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        finishPlan: _trpc_server.TRPCMutationProcedure<{
            input: number;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        activePlan: _trpc_server.TRPCMutationProcedure<{
            input: number;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        getMeal: _trpc_server.TRPCQueryProcedure<{
            input: number;
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date | null;
                protein: string | null;
                calories: string | null;
                note: string | null;
                userPlanId: number;
                mealIndex: number | null;
                vegeCalories: string | null;
                veges: string | null;
                vegeNotes: string | null;
                mealTitle: string | null;
                targetProtein: string | null;
                targetCalories: string | null;
            } | undefined;
            meta: object;
        }>;
        getRecipe: _trpc_server.TRPCQueryProcedure<{
            input: number;
            output: {
                id: number;
                name: string | null;
                createdAt: Date;
                updatedAt: Date | null;
                serveUnit: string | null;
                isUserCreated: boolean | null;
                index: number | null;
                serve: string | null;
                note: string | null;
                userPlanId: number | null;
                dailyLogId: number | null;
                mealIndex: number | null;
                dailyMealId: number | null;
                recipeIndex: number | null;
                parentId: number | null;
                isLog: boolean | null;
            } | undefined;
            meta: object;
        }>;
        getIngredient: _trpc_server.TRPCQueryProcedure<{
            input: number;
            output: {
                id: number;
                name: string | null;
                createdAt: Date;
                updatedAt: Date | null;
                serveUnit: string | null;
                isUserCreated: boolean | null;
                ingredientId: number | null;
                alternateId: number | null;
                serve: string | null;
                note: string | null;
                userPlanId: number | null;
                dailyLogId: number | null;
                mealIndex: number | null;
                dailyMealId: number | null;
                recipeIndex: number | null;
                ingredient: {
                    id: number;
                    name: string | null;
                    notes: string | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                    userId: string | null;
                    favouriteAt: Date | null;
                    deletedAt: Date | null;
                    hiddenAt: Date | null;
                    isAusFood: boolean | null;
                    isAllStores: boolean | null;
                    serveSize: string | null;
                    serveUnit: string | null;
                    publicFoodKey: string | null;
                    classification: string | null;
                    foodName: string | null;
                    caloriesWFibre: string | null;
                    caloriesWOFibre: string | null;
                    protein: string | null;
                    fatTotal: string | null;
                    totalDietaryFibre: string | null;
                    totalSugars: string | null;
                    starch: string | null;
                    resistantStarch: string | null;
                    availableCarbohydrateWithoutSugarAlcohols: string | null;
                    availableCarbohydrateWithSugarAlcohols: string | null;
                    isUserCreated: boolean | null;
                    isSupplement: boolean | null;
                    isPrivate: boolean | null;
                    viewableBy: string | null;
                    intervale: string | null;
                } | null;
                alternateIngredient: {
                    id: number;
                    name: string | null;
                    notes: string | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                    userId: string | null;
                    favouriteAt: Date | null;
                    deletedAt: Date | null;
                    hiddenAt: Date | null;
                    isAusFood: boolean | null;
                    isAllStores: boolean | null;
                    serveSize: string | null;
                    serveUnit: string | null;
                    publicFoodKey: string | null;
                    classification: string | null;
                    foodName: string | null;
                    caloriesWFibre: string | null;
                    caloriesWOFibre: string | null;
                    protein: string | null;
                    fatTotal: string | null;
                    totalDietaryFibre: string | null;
                    totalSugars: string | null;
                    starch: string | null;
                    resistantStarch: string | null;
                    availableCarbohydrateWithoutSugarAlcohols: string | null;
                    availableCarbohydrateWithSugarAlcohols: string | null;
                    isUserCreated: boolean | null;
                    isSupplement: boolean | null;
                    isPrivate: boolean | null;
                    viewableBy: string | null;
                    intervale: string | null;
                } | null;
            } | undefined;
            meta: object;
        }>;
        get: _trpc_server.TRPCQueryProcedure<{
            input: number;
            output: {
                id: number;
                name: string;
                notes: string;
                image: string;
                createdAt: Date;
                updatedAt: Date | null;
                description: string;
                userId: string;
                finishedAt: Date | null;
                startAt: Date | null;
                isActive: boolean | null;
                numberOfMeals: number | null;
                creatorId: string;
                favouriteAt: Date | null;
                deletedAt: Date | null;
                hiddenAt: Date | null;
                userMeals: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date | null;
                    protein: string | null;
                    calories: string | null;
                    note: string | null;
                    userPlanId: number;
                    mealIndex: number | null;
                    vegeCalories: string | null;
                    veges: string | null;
                    vegeNotes: string | null;
                    mealTitle: string | null;
                    targetProtein: string | null;
                    targetCalories: string | null;
                }[];
                userRecipes: {
                    id: number;
                    name: string | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                    serveUnit: string | null;
                    isUserCreated: boolean | null;
                    index: number | null;
                    serve: string | null;
                    note: string | null;
                    userPlanId: number | null;
                    dailyLogId: number | null;
                    mealIndex: number | null;
                    dailyMealId: number | null;
                    recipeIndex: number | null;
                    parentId: number | null;
                    isLog: boolean | null;
                }[];
                userIngredients: {
                    id: number;
                    name: string | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                    serveUnit: string | null;
                    isUserCreated: boolean | null;
                    ingredientId: number | null;
                    alternateId: number | null;
                    serve: string | null;
                    note: string | null;
                    userPlanId: number | null;
                    dailyLogId: number | null;
                    mealIndex: number | null;
                    dailyMealId: number | null;
                    recipeIndex: number | null;
                    ingredient: {
                        id: number;
                        name: string | null;
                        notes: string | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                        userId: string | null;
                        favouriteAt: Date | null;
                        deletedAt: Date | null;
                        hiddenAt: Date | null;
                        isAusFood: boolean | null;
                        isAllStores: boolean | null;
                        serveSize: string | null;
                        serveUnit: string | null;
                        publicFoodKey: string | null;
                        classification: string | null;
                        foodName: string | null;
                        caloriesWFibre: string | null;
                        caloriesWOFibre: string | null;
                        protein: string | null;
                        fatTotal: string | null;
                        totalDietaryFibre: string | null;
                        totalSugars: string | null;
                        starch: string | null;
                        resistantStarch: string | null;
                        availableCarbohydrateWithoutSugarAlcohols: string | null;
                        availableCarbohydrateWithSugarAlcohols: string | null;
                        isUserCreated: boolean | null;
                        isSupplement: boolean | null;
                        isPrivate: boolean | null;
                        viewableBy: string | null;
                        intervale: string | null;
                    } | null;
                    alternateIngredient: {
                        id: number;
                        name: string | null;
                        notes: string | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                        userId: string | null;
                        favouriteAt: Date | null;
                        deletedAt: Date | null;
                        hiddenAt: Date | null;
                        isAusFood: boolean | null;
                        isAllStores: boolean | null;
                        serveSize: string | null;
                        serveUnit: string | null;
                        publicFoodKey: string | null;
                        classification: string | null;
                        foodName: string | null;
                        caloriesWFibre: string | null;
                        caloriesWOFibre: string | null;
                        protein: string | null;
                        fatTotal: string | null;
                        totalDietaryFibre: string | null;
                        totalSugars: string | null;
                        starch: string | null;
                        resistantStarch: string | null;
                        availableCarbohydrateWithoutSugarAlcohols: string | null;
                        availableCarbohydrateWithSugarAlcohols: string | null;
                        isUserCreated: boolean | null;
                        isSupplement: boolean | null;
                        isPrivate: boolean | null;
                        viewableBy: string | null;
                        intervale: string | null;
                    } | null;
                }[];
            } | undefined;
            meta: object;
        }>;
        create: _trpc_server.TRPCMutationProcedure<{
            input: {
                name: string;
                description: string;
                image: string;
                notes: string;
                userId: string;
                meals: {
                    mealIndex: number;
                    mealTitle: string;
                    calories: string;
                    targetProtein: string;
                    targetCalories: string;
                    vegeCalories: string;
                    veges: string;
                    vegeNotes: string;
                    note: string;
                    recipes: {
                        recipeIndex: number;
                        mealIndex: number;
                        name: string;
                        note: string;
                        description: string;
                        index: number;
                        ingredients: {
                            ingredientId: number;
                            ingredientIndex: number;
                            recipeIndex: number;
                            mealIndex: number;
                            alternateId: number | null;
                            name: string;
                            serve: string;
                            serveUnit: string;
                            note: string;
                        }[];
                    }[];
                    protein?: string | undefined;
                }[];
            };
            output: {
                id: number;
            }[] | {
                res: {
                    id: number;
                }[];
                batchRes: [{
                    id: number;
                }[], {
                    id: number;
                }[], {
                    id: number;
                }[]];
            };
            meta: object;
        }>;
    }>>;
    weighIn: _trpc_server.TRPCBuiltRouter<{
        ctx: {
            headers: Headers;
            db: drizzle_orm_libsql.LibSQLDatabase<typeof ______db_schema> & {
                $client: _libsql_client.Client;
            };
            session: next_auth.Session | null;
        };
        meta: object;
        errorShape: {
            data: {
                zodError: zod.ZodFlattenedError<unknown, string> | null;
                code: _trpc_server.TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: _trpc_server.TRPC_ERROR_CODE_NUMBER;
        };
        transformer: true;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        create: _trpc_server.TRPCMutationProcedure<{
            input: {
                bodyWeight: string;
                bodyFat: string;
                leanMass: string;
                bloodPressure: string;
                userId: string;
                trainerId: string;
                date?: Date | undefined;
                notes?: string | undefined;
                image?: string | undefined;
            };
            output: {
                res: {
                    id: number;
                }[];
            };
            meta: object;
        }>;
        getAllUser: _trpc_server.TRPCQueryProcedure<{
            input: string;
            output: {
                date: Date;
                id: number;
                notes: string | null;
                image: string | null;
                createdAt: Date;
                userId: string;
                trainerId: string;
                bodyWeight: string | null;
                leanMass: string | null;
                bodyFat: string | null;
                bloodPressure: string | null;
            }[];
            meta: object;
        }>;
        get: _trpc_server.TRPCQueryProcedure<{
            input: number;
            output: {
                date: Date;
                id: number;
                notes: string | null;
                image: string | null;
                createdAt: Date;
                userId: string;
                trainerId: string;
                bodyWeight: string | null;
                leanMass: string | null;
                bodyFat: string | null;
                bloodPressure: string | null;
            } | undefined;
            meta: object;
        }>;
        delete: _trpc_server.TRPCMutationProcedure<{
            input: number;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        deleteAll: _trpc_server.TRPCMutationProcedure<{
            input: string;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
    }>>;
    message: _trpc_server.TRPCBuiltRouter<{
        ctx: {
            headers: Headers;
            db: drizzle_orm_libsql.LibSQLDatabase<typeof ______db_schema> & {
                $client: _libsql_client.Client;
            };
            session: next_auth.Session | null;
        };
        meta: object;
        errorShape: {
            data: {
                zodError: zod.ZodFlattenedError<unknown, string> | null;
                code: _trpc_server.TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: _trpc_server.TRPC_ERROR_CODE_NUMBER;
        };
        transformer: true;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        create: _trpc_server.TRPCMutationProcedure<{
            input: {
                userId: string;
                fromUserId: string;
                subject: string;
                message: string;
                isImportant: boolean;
                image?: string | undefined;
            };
            output: {
                res: {
                    id: number;
                }[];
            };
            meta: object;
        }>;
        getAllUser: _trpc_server.TRPCQueryProcedure<{
            input: string;
            output: {
                message: string | null;
                id: number;
                image: string | null;
                createdAt: Date;
                userId: string | null;
                isRead: boolean | null;
                isViewed: boolean | null;
                isDeleted: boolean | null;
                subject: string | null;
                isImportant: boolean | null;
                fromUserId: string | null;
                user: {
                    id: string;
                    name: string | null;
                    firstName: string | null;
                    lastName: string | null;
                    clerkId: string | null;
                    birthDate: Date | null;
                    gender: string | null;
                    address: string | null;
                    notes: string | null;
                    instagram: string | null;
                    openLifter: string | null;
                    phone: string | null;
                    email: string | null;
                    emailVerified: Date | null;
                    password: string | null;
                    currentPlanId: number | null;
                    image: string | null;
                    isFake: boolean | null;
                    isTrainer: boolean | null;
                    isRoot: boolean | null;
                    isCreator: boolean | null;
                    isAllTrainers: boolean | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                } | null;
                fromUser: {
                    id: string;
                    name: string | null;
                    firstName: string | null;
                    lastName: string | null;
                    clerkId: string | null;
                    birthDate: Date | null;
                    gender: string | null;
                    address: string | null;
                    notes: string | null;
                    instagram: string | null;
                    openLifter: string | null;
                    phone: string | null;
                    email: string | null;
                    emailVerified: Date | null;
                    password: string | null;
                    currentPlanId: number | null;
                    image: string | null;
                    isFake: boolean | null;
                    isTrainer: boolean | null;
                    isRoot: boolean | null;
                    isCreator: boolean | null;
                    isAllTrainers: boolean | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                } | null;
            }[];
            meta: object;
        }>;
        getAllFromUser: _trpc_server.TRPCQueryProcedure<{
            input: string;
            output: {
                message: string | null;
                id: number;
                image: string | null;
                createdAt: Date;
                userId: string | null;
                isRead: boolean | null;
                isViewed: boolean | null;
                isDeleted: boolean | null;
                subject: string | null;
                isImportant: boolean | null;
                fromUserId: string | null;
                user: {
                    id: string;
                    name: string | null;
                    firstName: string | null;
                    lastName: string | null;
                    clerkId: string | null;
                    birthDate: Date | null;
                    gender: string | null;
                    address: string | null;
                    notes: string | null;
                    instagram: string | null;
                    openLifter: string | null;
                    phone: string | null;
                    email: string | null;
                    emailVerified: Date | null;
                    password: string | null;
                    currentPlanId: number | null;
                    image: string | null;
                    isFake: boolean | null;
                    isTrainer: boolean | null;
                    isRoot: boolean | null;
                    isCreator: boolean | null;
                    isAllTrainers: boolean | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                } | null;
                fromUser: {
                    id: string;
                    name: string | null;
                    firstName: string | null;
                    lastName: string | null;
                    clerkId: string | null;
                    birthDate: Date | null;
                    gender: string | null;
                    address: string | null;
                    notes: string | null;
                    instagram: string | null;
                    openLifter: string | null;
                    phone: string | null;
                    email: string | null;
                    emailVerified: Date | null;
                    password: string | null;
                    currentPlanId: number | null;
                    image: string | null;
                    isFake: boolean | null;
                    isTrainer: boolean | null;
                    isRoot: boolean | null;
                    isCreator: boolean | null;
                    isAllTrainers: boolean | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                } | null;
            }[];
            meta: object;
        }>;
        get: _trpc_server.TRPCQueryProcedure<{
            input: number;
            output: {
                message: string | null;
                id: number;
                image: string | null;
                createdAt: Date;
                userId: string | null;
                isRead: boolean | null;
                isViewed: boolean | null;
                isDeleted: boolean | null;
                subject: string | null;
                isImportant: boolean | null;
                fromUserId: string | null;
            } | undefined;
            meta: object;
        }>;
        markAsViewed: _trpc_server.TRPCMutationProcedure<{
            input: number;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        markAsRead: _trpc_server.TRPCMutationProcedure<{
            input: number;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        markFromUserAsViewedAndRead: _trpc_server.TRPCMutationProcedure<{
            input: string;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        delete: _trpc_server.TRPCMutationProcedure<{
            input: number;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        deletePermanently: _trpc_server.TRPCMutationProcedure<{
            input: number;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
    }>>;
    metrics: _trpc_server.TRPCBuiltRouter<{
        ctx: {
            headers: Headers;
            db: drizzle_orm_libsql.LibSQLDatabase<typeof ______db_schema> & {
                $client: _libsql_client.Client;
            };
            session: next_auth.Session | null;
        };
        meta: object;
        errorShape: {
            data: {
                zodError: zod.ZodFlattenedError<unknown, string> | null;
                code: _trpc_server.TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: _trpc_server.TRPC_ERROR_CODE_NUMBER;
        };
        transformer: true;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        updateGallery: _trpc_server.TRPCMutationProcedure<{
            input: {
                image: string;
                userId: string;
            };
            output: {
                res: _libsql_client.ResultSet;
            };
            meta: object;
        }>;
        getUserSkinfolds: _trpc_server.TRPCQueryProcedure<{
            input: string;
            output: {
                test: string | null;
                date: string;
                id: number;
                notes: string | null;
                createdAt: Date;
                userId: string;
                creatorId: string | null;
                chin: string | null;
                cheek: string | null;
                lowerAbdominal: string | null;
                pectoral: string | null;
                biceps: string | null;
                triceps: string | null;
                subscapular: string | null;
                midAxillary: string | null;
                suprailiac: string | null;
                umbilical: string | null;
                lowerBack: string | null;
                quadriceps: string | null;
                hamstrings: string | null;
                medialCalf: string | null;
                knee: string | null;
                shoulder: string | null;
                formula: string | null;
                bodyWeight: {
                    date: string;
                    id: number;
                    notes: string | null;
                    createdAt: Date;
                    userId: string;
                    bodyWeight: string | null;
                    skinfoldId: number | null;
                    source: string | null;
                }[];
                leanMass: {
                    date: string;
                    id: number;
                    notes: string | null;
                    createdAt: Date;
                    userId: string;
                    leanMass: string | null;
                    formula: string | null;
                    skinfoldId: number | null;
                }[];
                bodyFat: {
                    date: string;
                    id: number;
                    notes: string | null;
                    createdAt: Date;
                    userId: string;
                    bodyFat: string | null;
                    formula: string | null;
                    skinfoldId: number | null;
                }[];
            }[];
            meta: object;
        }>;
        getAllSkinfolds: _trpc_server.TRPCQueryProcedure<{
            input: void;
            output: {
                test: string | null;
                date: string;
                id: number;
                notes: string | null;
                createdAt: Date;
                userId: string;
                creatorId: string | null;
                chin: string | null;
                cheek: string | null;
                lowerAbdominal: string | null;
                pectoral: string | null;
                biceps: string | null;
                triceps: string | null;
                subscapular: string | null;
                midAxillary: string | null;
                suprailiac: string | null;
                umbilical: string | null;
                lowerBack: string | null;
                quadriceps: string | null;
                hamstrings: string | null;
                medialCalf: string | null;
                knee: string | null;
                shoulder: string | null;
                formula: string | null;
                user: {
                    id: string;
                    name: string | null;
                    firstName: string | null;
                    lastName: string | null;
                    clerkId: string | null;
                    birthDate: Date | null;
                    gender: string | null;
                    address: string | null;
                    notes: string | null;
                    instagram: string | null;
                    openLifter: string | null;
                    phone: string | null;
                    email: string | null;
                    emailVerified: Date | null;
                    password: string | null;
                    currentPlanId: number | null;
                    image: string | null;
                    isFake: boolean | null;
                    isTrainer: boolean | null;
                    isRoot: boolean | null;
                    isCreator: boolean | null;
                    isAllTrainers: boolean | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                };
                bodyWeight: {
                    date: string;
                    id: number;
                    notes: string | null;
                    createdAt: Date;
                    userId: string;
                    bodyWeight: string | null;
                    skinfoldId: number | null;
                    source: string | null;
                }[];
                leanMass: {
                    date: string;
                    id: number;
                    notes: string | null;
                    createdAt: Date;
                    userId: string;
                    leanMass: string | null;
                    formula: string | null;
                    skinfoldId: number | null;
                }[];
                bodyFat: {
                    date: string;
                    id: number;
                    notes: string | null;
                    createdAt: Date;
                    userId: string;
                    bodyFat: string | null;
                    formula: string | null;
                    skinfoldId: number | null;
                }[];
            }[];
            meta: object;
        }>;
        getSkinfold: _trpc_server.TRPCQueryProcedure<{
            input: number;
            output: {
                test: string | null;
                date: string;
                id: number;
                notes: string | null;
                createdAt: Date;
                userId: string;
                creatorId: string | null;
                chin: string | null;
                cheek: string | null;
                lowerAbdominal: string | null;
                pectoral: string | null;
                biceps: string | null;
                triceps: string | null;
                subscapular: string | null;
                midAxillary: string | null;
                suprailiac: string | null;
                umbilical: string | null;
                lowerBack: string | null;
                quadriceps: string | null;
                hamstrings: string | null;
                medialCalf: string | null;
                knee: string | null;
                shoulder: string | null;
                formula: string | null;
                bodyWeight: {
                    date: string;
                    id: number;
                    notes: string | null;
                    createdAt: Date;
                    userId: string;
                    bodyWeight: string | null;
                    skinfoldId: number | null;
                    source: string | null;
                }[];
                leanMass: {
                    date: string;
                    id: number;
                    notes: string | null;
                    createdAt: Date;
                    userId: string;
                    leanMass: string | null;
                    formula: string | null;
                    skinfoldId: number | null;
                }[];
                bodyFat: {
                    date: string;
                    id: number;
                    notes: string | null;
                    createdAt: Date;
                    userId: string;
                    bodyFat: string | null;
                    formula: string | null;
                    skinfoldId: number | null;
                }[];
            } | undefined;
            meta: object;
        }>;
        deleteSkinfold: _trpc_server.TRPCMutationProcedure<{
            input: number;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        createSkinfold: _trpc_server.TRPCMutationProcedure<{
            input: {
                date: string;
                chin: string;
                cheek: string;
                lowerAbdominal: string;
                pectoral: string;
                biceps: string;
                triceps: string;
                subscapular: string;
                midAxillary: string;
                suprailiac: string;
                umbilical: string;
                lowerBack: string;
                quadriceps: string;
                hamstrings: string;
                medialCalf: string;
                knee: string;
                shoulder: string;
                notes: string;
                userId: string;
                bodyWeight: string;
                leanMass: string;
                bodyFat: string;
            };
            output: {
                res: {
                    id: number;
                }[];
            };
            meta: object;
        }>;
    }>>;
    trainer: _trpc_server.TRPCBuiltRouter<{
        ctx: {
            headers: Headers;
            db: drizzle_orm_libsql.LibSQLDatabase<typeof ______db_schema> & {
                $client: _libsql_client.Client;
            };
            session: next_auth.Session | null;
        };
        meta: object;
        errorShape: {
            data: {
                zodError: zod.ZodFlattenedError<unknown, string> | null;
                code: _trpc_server.TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: _trpc_server.TRPC_ERROR_CODE_NUMBER;
        };
        transformer: true;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        getAll: _trpc_server.TRPCQueryProcedure<{
            input: void;
            output: {
                id: string;
                name: string | null;
            }[];
            meta: object;
        }>;
        add: _trpc_server.TRPCMutationProcedure<{
            input: {
                userId: string;
                trainerId: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        delete: _trpc_server.TRPCMutationProcedure<{
            input: {
                userId: string;
                trainerId: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
    }>>;
    supplement: _trpc_server.TRPCBuiltRouter<{
        ctx: {
            headers: Headers;
            db: drizzle_orm_libsql.LibSQLDatabase<typeof ______db_schema> & {
                $client: _libsql_client.Client;
            };
            session: next_auth.Session | null;
        };
        meta: object;
        errorShape: {
            data: {
                zodError: zod.ZodFlattenedError<unknown, string> | null;
                code: _trpc_server.TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: _trpc_server.TRPC_ERROR_CODE_NUMBER;
        };
        transformer: true;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        delete: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        getAll: _trpc_server.TRPCQueryProcedure<{
            input: void;
            output: {
                id: number;
                name: string | null;
                notes: string | null;
                createdAt: Date;
                updatedAt: Date | null;
                userId: string | null;
                favouriteAt: Date | null;
                deletedAt: Date | null;
                hiddenAt: Date | null;
                isAusFood: boolean | null;
                isAllStores: boolean | null;
                serveSize: string | null;
                serveUnit: string | null;
                publicFoodKey: string | null;
                classification: string | null;
                foodName: string | null;
                caloriesWFibre: string | null;
                caloriesWOFibre: string | null;
                protein: string | null;
                fatTotal: string | null;
                totalDietaryFibre: string | null;
                totalSugars: string | null;
                starch: string | null;
                resistantStarch: string | null;
                availableCarbohydrateWithoutSugarAlcohols: string | null;
                availableCarbohydrateWithSugarAlcohols: string | null;
                isUserCreated: boolean | null;
                isSupplement: boolean | null;
                isPrivate: boolean | null;
                viewableBy: string | null;
                intervale: string | null;
                user: {
                    id: string;
                    name: string | null;
                } | null;
            }[];
            meta: object;
        }>;
        getSupplementFromDailyLog: _trpc_server.TRPCQueryProcedure<{
            input: {
                id: number;
            };
            output: boolean;
            meta: object;
        }>;
        getFullSupplement: _trpc_server.TRPCQueryProcedure<{
            input: {
                id: number;
            };
            output: {
                id: number;
                name: string | null;
                notes: string | null;
                createdAt: Date;
                updatedAt: Date | null;
                userId: string | null;
                favouriteAt: Date | null;
                deletedAt: Date | null;
                hiddenAt: Date | null;
                isAusFood: boolean | null;
                isAllStores: boolean | null;
                serveSize: string | null;
                serveUnit: string | null;
                publicFoodKey: string | null;
                classification: string | null;
                foodName: string | null;
                caloriesWFibre: string | null;
                caloriesWOFibre: string | null;
                protein: string | null;
                fatTotal: string | null;
                totalDietaryFibre: string | null;
                totalSugars: string | null;
                starch: string | null;
                resistantStarch: string | null;
                availableCarbohydrateWithoutSugarAlcohols: string | null;
                availableCarbohydrateWithSugarAlcohols: string | null;
                isUserCreated: boolean | null;
                isSupplement: boolean | null;
                isPrivate: boolean | null;
                viewableBy: string | null;
                intervale: string | null;
                user: {
                    id: string;
                    name: string | null;
                } | null;
                ingredientAdditionOne: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date | null;
                    ingredientId: number | null;
                    energyWithDietaryFibre: string | null;
                    energyWithoutDietaryFibre: string | null;
                    addedSugars: string | null;
                    freeSugars: string | null;
                    moisture: string | null;
                    nitrogen: string | null;
                    alcohol: string | null;
                    fructose: string | null;
                    glucose: string | null;
                    sucrose: string | null;
                    maltose: string | null;
                    lactose: string | null;
                    galactose: string | null;
                    maltotrios: string | null;
                    ash: string | null;
                    dextrin: string | null;
                    glycerol: string | null;
                    glycogen: string | null;
                    inulin: string | null;
                    erythritol: string | null;
                    maltitol: string | null;
                    mannitol: string | null;
                    xylitol: string | null;
                    maltodextrin: string | null;
                    oligosaccharides: string | null;
                    polydextrose: string | null;
                    raffinose: string | null;
                    stachyose: string | null;
                    sorbitol: string | null;
                };
                ingredientAdditionTwo: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date | null;
                    ingredientId: number | null;
                    aceticAcid: string | null;
                    citricAcid: string | null;
                    fumaricAcid: string | null;
                    lacticAcid: string | null;
                    malicAcid: string | null;
                    oxalicAcid: string | null;
                    propionicAcid: string | null;
                    quinicAcid: string | null;
                    shikimicAcid: string | null;
                    succinicAcid: string | null;
                    tartaricAcid: string | null;
                    aluminium: string | null;
                    antimony: string | null;
                    arsenic: string | null;
                    cadmium: string | null;
                    calcium: string | null;
                    chromium: string | null;
                    chloride: string | null;
                    cobalt: string | null;
                    copper: string | null;
                    fluoride: string | null;
                    iodine: string | null;
                    iron: string | null;
                    lead: string | null;
                    magnesium: string | null;
                    manganese: string | null;
                    mercury: string | null;
                    molybdenum: string | null;
                    nickel: string | null;
                    phosphorus: string | null;
                    potassium: string | null;
                    selenium: string | null;
                    sodium: string | null;
                    sulphur: string | null;
                    tin: string | null;
                    zinc: string | null;
                    retinol: string | null;
                    alphaCarotene: string | null;
                    betaCarotene: string | null;
                    cryptoxanthin: string | null;
                    betaCaroteneEquivalents: string | null;
                    vitaminARetinolEquivalents: string | null;
                    lutein: string | null;
                    lycopene: string | null;
                    xanthophyl: string | null;
                    thiamin: string | null;
                    riboflavin: string | null;
                    niacin: string | null;
                    niacinDerivedFromTryptophan: string | null;
                    niacinDerivedEquivalents: string | null;
                    pantothenicAcid: string | null;
                    pyridoxine: string | null;
                    biotin: string | null;
                    cobalamin: string | null;
                    folateNatural: string | null;
                    folicAcid: string | null;
                    totalFolates: string | null;
                    dietaryFolateEquivalents: string | null;
                    vitaminC: string | null;
                    cholecalciferol: string | null;
                    ergocalciferol: string | null;
                    hydroxyCholecalciferol: string | null;
                    hydroxyErgocalciferol: string | null;
                    vitaminDEquivalents: string | null;
                    alphaTocopherol: string | null;
                    alphaTocotrienol: string | null;
                    betaTocopherol: string | null;
                    betaTocotrienol: string | null;
                    deltaTocopherol: string | null;
                    deltaTocotrienol: string | null;
                    gammaTocopherol: string | null;
                    gammaTocotrienol: string | null;
                    vitaminE: string | null;
                };
                ingredientAdditionThree: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date | null;
                    ingredientId: number | null;
                    totalSaturatedFattyAcids: string | null;
                    totalMonounsaturatedFattyAcids: string | null;
                    totalPolyunsaturatedFattyAcids: string | null;
                    totalLongChainOmega3FattyAcids: string | null;
                    totalTransFattyAcids: string | null;
                    caffeine: string | null;
                    cholesterol: string | null;
                    alanine: string | null;
                    arginine: string | null;
                    asparticAcid: string | null;
                    cystinePlusCysteine: string | null;
                    glutamicAcid: string | null;
                    glycine: string | null;
                    histidine: string | null;
                    isoleucine: string | null;
                    leucine: string | null;
                    lysine: string | null;
                    methionine: string | null;
                    phenylalanine: string | null;
                    proline: string | null;
                    serine: string | null;
                    threonine: string | null;
                    tyrosine: string | null;
                    tryptophan: string | null;
                    valine: string | null;
                    c4: string | null;
                    c6: string | null;
                    c8: string | null;
                    c10: string | null;
                    c11: string | null;
                    c12: string | null;
                    c13: string | null;
                    c14: string | null;
                    c15: string | null;
                    c16: string | null;
                    c17: string | null;
                    c18: string | null;
                    c19: string | null;
                    c20: string | null;
                    c21: string | null;
                    c22: string | null;
                    c23: string | null;
                    c24: string | null;
                    totalSaturatedFattyAcidsEquated: string | null;
                    c10_1: string | null;
                    c12_1: string | null;
                    c14_1: string | null;
                    c15_1: string | null;
                    c16_1: string | null;
                    c17_1: string | null;
                    c18_1: string | null;
                    c18_1w5: string | null;
                    c18_1w6: string | null;
                    c18_1w7: string | null;
                    c18_1w9: string | null;
                    c20_1: string | null;
                    c20_1w9: string | null;
                    c20_1w13: string | null;
                    c20_1w11: string | null;
                    c22_1: string | null;
                    c22_1w9: string | null;
                    c22_1w11: string | null;
                    c24_1: string | null;
                    c24_1w9: string | null;
                    c24_1w11: string | null;
                    c24_1w13: string | null;
                    totalMonounsaturatedFattyAcidsEquated: string | null;
                    c12_2: string | null;
                    c16_2w4: string | null;
                    c16_3: string | null;
                    c18_2w6: string | null;
                    c18_3w3: string | null;
                    c18_3w4: string | null;
                    c18_3w6: string | null;
                    c18_4w1: string | null;
                    c18_4w3: string | null;
                    c20_2: string | null;
                    c20_2w6: string | null;
                    c20_3: string | null;
                    c20_3w3: string | null;
                    c20_3w6: string | null;
                    c20_4: string | null;
                    c20_4w3: string | null;
                    c20_4w6: string | null;
                    c20_5w3: string | null;
                    c21_5w3: string | null;
                    c22_2: string | null;
                    c22_2w6: string | null;
                    c22_4w6: string | null;
                    c22_5w3: string | null;
                    c22_5w6: string | null;
                    c22_6w3: string | null;
                    totalPolyunsaturatedFattyAcidsEquated: string | null;
                };
            } | undefined;
            meta: object;
        }>;
        getSupplement: _trpc_server.TRPCQueryProcedure<{
            input: {
                id: number;
            };
            output: {
                id: number;
                name: string | null;
                notes: string | null;
                createdAt: Date;
                updatedAt: Date | null;
                userId: string | null;
                favouriteAt: Date | null;
                deletedAt: Date | null;
                hiddenAt: Date | null;
                isAusFood: boolean | null;
                isAllStores: boolean | null;
                serveSize: string | null;
                serveUnit: string | null;
                publicFoodKey: string | null;
                classification: string | null;
                foodName: string | null;
                caloriesWFibre: string | null;
                caloriesWOFibre: string | null;
                protein: string | null;
                fatTotal: string | null;
                totalDietaryFibre: string | null;
                totalSugars: string | null;
                starch: string | null;
                resistantStarch: string | null;
                availableCarbohydrateWithoutSugarAlcohols: string | null;
                availableCarbohydrateWithSugarAlcohols: string | null;
                isUserCreated: boolean | null;
                isSupplement: boolean | null;
                isPrivate: boolean | null;
                viewableBy: string | null;
                intervale: string | null;
                user: {
                    id: string;
                    name: string | null;
                } | null;
            } | undefined;
            meta: object;
        }>;
        addTime: _trpc_server.TRPCMutationProcedure<{
            input: {
                time: string;
                userId: string;
            };
            output: {
                id: number;
            }[];
            meta: object;
        }>;
        getSuppFromPlan: _trpc_server.TRPCQueryProcedure<{
            input: {
                id: number;
            };
            output: {
                id: number;
                supplementId: number;
                supplementStackId: number;
                size: string | null;
                unit: string | null;
                supplement: {
                    id: number;
                    name: string | null;
                    notes: string | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                    userId: string | null;
                    favouriteAt: Date | null;
                    deletedAt: Date | null;
                    hiddenAt: Date | null;
                    isAusFood: boolean | null;
                    isAllStores: boolean | null;
                    serveSize: string | null;
                    serveUnit: string | null;
                    publicFoodKey: string | null;
                    classification: string | null;
                    foodName: string | null;
                    caloriesWFibre: string | null;
                    caloriesWOFibre: string | null;
                    protein: string | null;
                    fatTotal: string | null;
                    totalDietaryFibre: string | null;
                    totalSugars: string | null;
                    starch: string | null;
                    resistantStarch: string | null;
                    availableCarbohydrateWithoutSugarAlcohols: string | null;
                    availableCarbohydrateWithSugarAlcohols: string | null;
                    isUserCreated: boolean | null;
                    isSupplement: boolean | null;
                    isPrivate: boolean | null;
                    viewableBy: string | null;
                    intervale: string | null;
                };
            } | undefined;
            meta: object;
        }>;
        addToUser: _trpc_server.TRPCMutationProcedure<{
            input: {
                suppId: number;
                userId: string;
                time: string;
                size: string;
                unit: string;
            };
            output: boolean;
            meta: object;
        }>;
        logSupplement: _trpc_server.TRPCMutationProcedure<{
            input: {
                suppId: number;
                suppName: string;
                date: string;
                time: string;
                amount: string;
                unit: string;
                stackId: string;
            };
            output: boolean;
            meta: object;
        }>;
        unLogSupplement: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: boolean;
            meta: object;
        }>;
        deleteFromUser: _trpc_server.TRPCMutationProcedure<{
            input: {
                suppId: number;
                suppStackId: number;
            };
            output: boolean;
            meta: object;
        }>;
        deleteTime: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: boolean;
            meta: object;
        }>;
        userCreate: _trpc_server.TRPCMutationProcedure<{
            input: {
                name: string;
                serveSize: number;
                serveUnit: string;
                isPrivate: boolean;
                stackId: number;
                userId: string;
                viewableBy?: string | undefined;
            };
            output: {
                id: number;
            }[];
            meta: object;
        }>;
        update: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
                isPrivate: boolean;
                viewableBy: string;
                name: string;
                serveSize: number;
                serveUnit: string;
                caloriesWFibre: number;
                caloriesWOFibre: number;
                protein: number;
                fatTotal: number;
                totalDietaryFibre: number;
                totalSugars: number;
                starch: number;
                resistantStarch: number;
                availableCarbohydrateWithoutSugarAlcohols: number;
                availableCarbohydrateWithSugarAlcohols: number;
                addedSugars: number;
                freeSugars: number;
                moisture: number;
                nitrogen: number;
                alcohol: number;
                fructose: number;
                glucose: number;
                sucrose: number;
                maltose: number;
                lactose: number;
                galactose: number;
                maltotrios: number;
                ash: number;
                dextrin: number;
                glycerol: number;
                glycogen: number;
                inulin: number;
                erythritol: number;
                maltitol: number;
                mannitol: number;
                xylitol: number;
                maltodextrin: number;
                oligosaccharides: number;
                polydextrose: number;
                raffinose: number;
                stachyose: number;
                sorbitol: number;
                aceticAcid: number;
                citricAcid: number;
                fumaricAcid: number;
                lacticAcid: number;
                malicAcid: number;
                oxalicAcid: number;
                propionicAcid: number;
                quinicAcid: number;
                shikimicAcid: number;
                succinicAcid: number;
                tartaricAcid: number;
                aluminium: number;
                antimony: number;
                arsenic: number;
                cadmium: number;
                calcium: number;
                chromium: number;
                chloride: number;
                cobalt: number;
                copper: number;
                fluoride: number;
                iodine: number;
                iron: number;
                lead: number;
                magnesium: number;
                manganese: number;
                mercury: number;
                molybdenum: number;
                nickel: number;
                phosphorus: number;
                potassium: number;
                selenium: number;
                sodium: number;
                sulphur: number;
                tin: number;
                zinc: number;
                retinol: number;
                alphaCarotene: number;
                betaCarotene: number;
                cryptoxanthin: number;
                betaCaroteneEquivalents: number;
                vitaminARetinolEquivalents: number;
                lutein: number;
                lycopene: number;
                xanthophyl: number;
                thiamin: number;
                riboflavin: number;
                niacin: number;
                niacinDerivedFromTryptophan: number;
                niacinDerivedEquivalents: number;
                pantothenicAcid: number;
                pyridoxine: number;
                biotin: number;
                cobalamin: number;
                folateNatural: number;
                folicAcid: number;
                totalFolates: number;
                dietaryFolateEquivalents: number;
                vitaminC: number;
                cholecalciferol: number;
                ergocalciferol: number;
                hydroxyCholecalciferol: number;
                hydroxyErgocalciferol: number;
                vitaminDEquivalents: number;
                alphaTocopherol: number;
                alphaTocotrienol: number;
                betaTocopherol: number;
                betaTocotrienol: number;
                deltaTocopherol: number;
                deltaTocotrienol: number;
                gammaTocopherol: number;
                gammaTocotrienol: number;
                vitaminE: number;
                totalSaturatedFattyAcids: number;
                totalMonounsaturatedFattyAcids: number;
                totalPolyunsaturatedFattyAcids: number;
                totalLongChainOmega3FattyAcids: number;
                totalTransFattyAcids: number;
                caffeine: number;
                cholesterol: number;
                alanine: number;
                arginine: number;
                asparticAcid: number;
                cystinePlusCysteine: number;
                glutamicAcid: number;
                glycine: number;
                histidine: number;
                isoleucine: number;
                leucine: number;
                lysine: number;
                methionine: number;
                phenylalanine: number;
                proline: number;
                serine: number;
                threonine: number;
                tyrosine: number;
                tryptophan: number;
                valine: number;
                c4: number;
                c6: number;
                c8: number;
                c10: number;
                c11: number;
                c12: number;
                c13: number;
                c14: number;
                c15: number;
                c16: number;
                c17: number;
                c18: number;
                c19: number;
                c20: number;
                c21: number;
                c22: number;
                c23: number;
                c24: number;
                totalSaturatedFattyAcidsEquated: number;
                c10_1: number;
                c12_1: number;
                c14_1: number;
                c15_1: number;
                c16_1: number;
                c17_1: number;
                c18_1: number;
                c18_1w5: number;
                c18_1w6: number;
                c18_1w7: number;
                c18_1w9: number;
                c20_1: number;
                c20_1w9: number;
                c20_1w13: number;
                c20_1w11: number;
                c22_1: number;
                c22_1w9: number;
                c22_1w11: number;
                c24_1: number;
                c24_1w9: number;
                c24_1w11: number;
                c24_1w13: number;
                totalMonounsaturatedFattyAcidsEquated: number;
                c12_2: number;
                c16_2w4: number;
                c16_3: number;
                c18_2w6: number;
                c18_3w3: number;
                c18_3w4: number;
                c18_3w6: number;
                c18_4w1: number;
                c18_4w3: number;
                c20_2: number;
                c20_2w6: number;
                c20_3: number;
                c20_3w3: number;
                c20_3w6: number;
                c20_4: number;
                c20_4w3: number;
                c20_4w6: number;
                c20_5w3: number;
                c21_5w3: number;
                c22_2: number;
                c22_2w6: number;
                c22_4w6: number;
                c22_5w3: number;
                c22_5w6: number;
                c22_6w3: number;
                totalPolyunsaturatedFattyAcidsEquated: number;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        create: _trpc_server.TRPCMutationProcedure<{
            input: {
                name: string;
                isPrivate: boolean;
                viewableBy: string;
                serveSize: number;
                serveUnit: string;
                caloriesWFibre: number;
                caloriesWOFibre: number;
                protein: number;
                fatTotal: number;
                totalDietaryFibre: number;
                totalSugars: number;
                starch: number;
                resistantStarch: number;
                availableCarbohydrateWithoutSugarAlcohols: number;
                availableCarbohydrateWithSugarAlcohols: number;
                addedSugars: number;
                freeSugars: number;
                moisture: number;
                nitrogen: number;
                alcohol: number;
                fructose: number;
                glucose: number;
                sucrose: number;
                maltose: number;
                lactose: number;
                galactose: number;
                maltotrios: number;
                ash: number;
                dextrin: number;
                glycerol: number;
                glycogen: number;
                inulin: number;
                erythritol: number;
                maltitol: number;
                mannitol: number;
                xylitol: number;
                maltodextrin: number;
                oligosaccharides: number;
                polydextrose: number;
                raffinose: number;
                stachyose: number;
                sorbitol: number;
                aceticAcid: number;
                citricAcid: number;
                fumaricAcid: number;
                lacticAcid: number;
                malicAcid: number;
                oxalicAcid: number;
                propionicAcid: number;
                quinicAcid: number;
                shikimicAcid: number;
                succinicAcid: number;
                tartaricAcid: number;
                aluminium: number;
                antimony: number;
                arsenic: number;
                cadmium: number;
                calcium: number;
                chromium: number;
                chloride: number;
                cobalt: number;
                copper: number;
                fluoride: number;
                iodine: number;
                iron: number;
                lead: number;
                magnesium: number;
                manganese: number;
                mercury: number;
                molybdenum: number;
                nickel: number;
                phosphorus: number;
                potassium: number;
                selenium: number;
                sodium: number;
                sulphur: number;
                tin: number;
                zinc: number;
                retinol: number;
                alphaCarotene: number;
                betaCarotene: number;
                cryptoxanthin: number;
                betaCaroteneEquivalents: number;
                vitaminARetinolEquivalents: number;
                lutein: number;
                lycopene: number;
                xanthophyl: number;
                thiamin: number;
                riboflavin: number;
                niacin: number;
                niacinDerivedFromTryptophan: number;
                niacinDerivedEquivalents: number;
                pantothenicAcid: number;
                pyridoxine: number;
                biotin: number;
                cobalamin: number;
                folateNatural: number;
                folicAcid: number;
                totalFolates: number;
                dietaryFolateEquivalents: number;
                vitaminC: number;
                cholecalciferol: number;
                ergocalciferol: number;
                hydroxyCholecalciferol: number;
                hydroxyErgocalciferol: number;
                vitaminDEquivalents: number;
                alphaTocopherol: number;
                alphaTocotrienol: number;
                betaTocopherol: number;
                betaTocotrienol: number;
                deltaTocopherol: number;
                deltaTocotrienol: number;
                gammaTocopherol: number;
                gammaTocotrienol: number;
                vitaminE: number;
                totalSaturatedFattyAcids: number;
                totalMonounsaturatedFattyAcids: number;
                totalPolyunsaturatedFattyAcids: number;
                totalLongChainOmega3FattyAcids: number;
                totalTransFattyAcids: number;
                caffeine: number;
                cholesterol: number;
                alanine: number;
                arginine: number;
                asparticAcid: number;
                cystinePlusCysteine: number;
                glutamicAcid: number;
                glycine: number;
                histidine: number;
                isoleucine: number;
                leucine: number;
                lysine: number;
                methionine: number;
                phenylalanine: number;
                proline: number;
                serine: number;
                threonine: number;
                tyrosine: number;
                tryptophan: number;
                valine: number;
                c4: number;
                c6: number;
                c8: number;
                c10: number;
                c11: number;
                c12: number;
                c13: number;
                c14: number;
                c15: number;
                c16: number;
                c17: number;
                c18: number;
                c19: number;
                c20: number;
                c21: number;
                c22: number;
                c23: number;
                c24: number;
                totalSaturatedFattyAcidsEquated: number;
                c10_1: number;
                c12_1: number;
                c14_1: number;
                c15_1: number;
                c16_1: number;
                c17_1: number;
                c18_1: number;
                c18_1w5: number;
                c18_1w6: number;
                c18_1w7: number;
                c18_1w9: number;
                c20_1: number;
                c20_1w9: number;
                c20_1w13: number;
                c20_1w11: number;
                c22_1: number;
                c22_1w9: number;
                c22_1w11: number;
                c24_1: number;
                c24_1w9: number;
                c24_1w11: number;
                c24_1w13: number;
                totalMonounsaturatedFattyAcidsEquated: number;
                c12_2: number;
                c16_2w4: number;
                c16_3: number;
                c18_2w6: number;
                c18_3w3: number;
                c18_3w4: number;
                c18_3w6: number;
                c18_4w1: number;
                c18_4w3: number;
                c20_2: number;
                c20_2w6: number;
                c20_3: number;
                c20_3w3: number;
                c20_3w6: number;
                c20_4: number;
                c20_4w3: number;
                c20_4w6: number;
                c20_5w3: number;
                c21_5w3: number;
                c22_2: number;
                c22_2w6: number;
                c22_4w6: number;
                c22_5w3: number;
                c22_5w6: number;
                c22_6w3: number;
                totalPolyunsaturatedFattyAcidsEquated: number;
            };
            output: {
                id: number;
            }[];
            meta: object;
        }>;
    }>>;
    trainerNotes: _trpc_server.TRPCBuiltRouter<{
        ctx: {
            headers: Headers;
            db: drizzle_orm_libsql.LibSQLDatabase<typeof ______db_schema> & {
                $client: _libsql_client.Client;
            };
            session: next_auth.Session | null;
        };
        meta: object;
        errorShape: {
            data: {
                zodError: zod.ZodFlattenedError<unknown, string> | null;
                code: _trpc_server.TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: _trpc_server.TRPC_ERROR_CODE_NUMBER;
        };
        transformer: true;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        getAllUser: _trpc_server.TRPCQueryProcedure<{
            input: {
                userId: string;
            };
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date | null;
                description: string | null;
                userId: string;
                title: string | null;
                trainerId: string;
                state: string | null;
                trainer: {
                    id: string;
                    name: string | null;
                    firstName: string | null;
                    lastName: string | null;
                    clerkId: string | null;
                    birthDate: Date | null;
                    gender: string | null;
                    address: string | null;
                    notes: string | null;
                    instagram: string | null;
                    openLifter: string | null;
                    phone: string | null;
                    email: string | null;
                    emailVerified: Date | null;
                    password: string | null;
                    currentPlanId: number | null;
                    image: string | null;
                    isFake: boolean | null;
                    isTrainer: boolean | null;
                    isRoot: boolean | null;
                    isCreator: boolean | null;
                    isAllTrainers: boolean | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                };
            }[];
            meta: object;
        }>;
        get: _trpc_server.TRPCQueryProcedure<{
            input: {
                id: number;
            };
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date | null;
                description: string | null;
                userId: string;
                title: string | null;
                trainerId: string;
                state: string | null;
                trainer: {
                    id: string;
                    name: string | null;
                    firstName: string | null;
                    lastName: string | null;
                    clerkId: string | null;
                    birthDate: Date | null;
                    gender: string | null;
                    address: string | null;
                    notes: string | null;
                    instagram: string | null;
                    openLifter: string | null;
                    phone: string | null;
                    email: string | null;
                    emailVerified: Date | null;
                    password: string | null;
                    currentPlanId: number | null;
                    image: string | null;
                    isFake: boolean | null;
                    isTrainer: boolean | null;
                    isRoot: boolean | null;
                    isCreator: boolean | null;
                    isAllTrainers: boolean | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                };
            } | undefined;
            meta: object;
        }>;
        create: _trpc_server.TRPCMutationProcedure<{
            input: {
                userId: string;
                title: string;
                description: string;
                state: string;
            };
            output: {
                id: number;
            }[];
            meta: object;
        }>;
        update: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
                title: string;
                description: string;
                state: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        delete: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
    }>>;
    userCatagories: _trpc_server.TRPCBuiltRouter<{
        ctx: {
            headers: Headers;
            db: drizzle_orm_libsql.LibSQLDatabase<typeof ______db_schema> & {
                $client: _libsql_client.Client;
            };
            session: next_auth.Session | null;
        };
        meta: object;
        errorShape: {
            data: {
                zodError: zod.ZodFlattenedError<unknown, string> | null;
                code: _trpc_server.TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: _trpc_server.TRPC_ERROR_CODE_NUMBER;
        };
        transformer: true;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        getAll: _trpc_server.TRPCQueryProcedure<{
            input: void;
            output: {
                id: number;
                name: string | null;
            }[];
            meta: object;
        }>;
        create: _trpc_server.TRPCMutationProcedure<{
            input: string;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        update: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
                name: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        delete: _trpc_server.TRPCMutationProcedure<{
            input: number;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        addToUser: _trpc_server.TRPCMutationProcedure<{
            input: {
                userId: string;
                categoryId: number;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        removeFromUser: _trpc_server.TRPCMutationProcedure<{
            input: {
                userId: string;
                categoryId: number;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
    }>>;
    notifications: _trpc_server.TRPCBuiltRouter<{
        ctx: {
            headers: Headers;
            db: drizzle_orm_libsql.LibSQLDatabase<typeof ______db_schema> & {
                $client: _libsql_client.Client;
            };
            session: next_auth.Session | null;
        };
        meta: object;
        errorShape: {
            data: {
                zodError: zod.ZodFlattenedError<unknown, string> | null;
                code: _trpc_server.TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: _trpc_server.TRPC_ERROR_CODE_NUMBER;
        };
        transformer: true;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        create: _trpc_server.TRPCMutationProcedure<{
            input: {
                userId: string;
                code: string;
                title: string;
                description?: string | undefined;
                notes?: string | undefined;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        get: _trpc_server.TRPCQueryProcedure<{
            input: number;
            output: {
                id: number;
                notes: string | null;
                createdAt: Date;
                description: string | null;
                userId: string | null;
                code: string | null;
                title: string | null;
                isRead: boolean | null;
                isViewed: boolean | null;
                isDeleted: boolean | null;
            } | undefined;
            meta: object;
        }>;
        getAll: _trpc_server.TRPCQueryProcedure<{
            input: void;
            output: {
                id: number;
                notes: string | null;
                createdAt: Date;
                description: string | null;
                userId: string | null;
                code: string | null;
                title: string | null;
                isRead: boolean | null;
                isViewed: boolean | null;
                isDeleted: boolean | null;
            }[];
            meta: object;
        }>;
        getAllUser: _trpc_server.TRPCQueryProcedure<{
            input: string;
            output: {
                id: number;
                notes: string | null;
                createdAt: Date;
                description: string | null;
                userId: string | null;
                code: string | null;
                title: string | null;
                isRead: boolean | null;
                isViewed: boolean | null;
                isDeleted: boolean | null;
            }[];
            meta: object;
        }>;
        delete: _trpc_server.TRPCMutationProcedure<{
            input: number;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        markAsRead: _trpc_server.TRPCMutationProcedure<{
            input: number;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        markAllAsViewed: _trpc_server.TRPCMutationProcedure<{
            input: string;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        markAsViewed: _trpc_server.TRPCMutationProcedure<{
            input: number;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
    }>>;
    adminLog: _trpc_server.TRPCBuiltRouter<{
        ctx: {
            headers: Headers;
            db: drizzle_orm_libsql.LibSQLDatabase<typeof ______db_schema> & {
                $client: _libsql_client.Client;
            };
            session: next_auth.Session | null;
        };
        meta: object;
        errorShape: {
            data: {
                zodError: zod.ZodFlattenedError<unknown, string> | null;
                code: _trpc_server.TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: _trpc_server.TRPC_ERROR_CODE_NUMBER;
        };
        transformer: true;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        create: _trpc_server.TRPCMutationProcedure<{
            input: {
                task: string;
                notes: string;
            };
            output: boolean;
            meta: object;
        }>;
    }>>;
}>>;
type AppRouter = typeof appRouter;
/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
declare const createCaller: _trpc_server.TRPCRouterCaller<{
    ctx: {
        headers: Headers;
        db: drizzle_orm_libsql.LibSQLDatabase<typeof ______db_schema> & {
            $client: _libsql_client.Client;
        };
        session: next_auth.Session | null;
    };
    meta: object;
    errorShape: {
        data: {
            zodError: zod.ZodFlattenedError<unknown, string> | null;
            code: _trpc_server.TRPC_ERROR_CODE_KEY;
            httpStatus: number;
            path?: string;
            stack?: string;
        };
        message: string;
        code: _trpc_server.TRPC_ERROR_CODE_NUMBER;
    };
    transformer: true;
}, _trpc_server.TRPCDecorateCreateRouterOptions<{
    goal: _trpc_server.TRPCBuiltRouter<{
        ctx: {
            headers: Headers;
            db: drizzle_orm_libsql.LibSQLDatabase<typeof ______db_schema> & {
                $client: _libsql_client.Client;
            };
            session: next_auth.Session | null;
        };
        meta: object;
        errorShape: {
            data: {
                zodError: zod.ZodFlattenedError<unknown, string> | null;
                code: _trpc_server.TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: _trpc_server.TRPC_ERROR_CODE_NUMBER;
        };
        transformer: true;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        create: _trpc_server.TRPCMutationProcedure<{
            input: {
                userId: string;
                title: string;
                description: string;
                state: string;
            };
            output: {
                id: number;
            }[];
            meta: object;
        }>;
        update: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
                title: string;
                description: string;
                state: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        delete: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        getUser: _trpc_server.TRPCQueryProcedure<{
            input: {
                userId: string;
            };
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date | null;
                description: string | null;
                userId: string;
                title: string | null;
                trainerId: string;
                state: string | null;
                completedAt: Date | null;
            }[];
            meta: object;
        }>;
        get: _trpc_server.TRPCQueryProcedure<{
            input: {
                id: number;
            };
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date | null;
                description: string | null;
                userId: string;
                title: string | null;
                trainerId: string;
                state: string | null;
                completedAt: Date | null;
            } | undefined;
            meta: object;
        }>;
    }>>;
    tag: _trpc_server.TRPCBuiltRouter<{
        ctx: {
            headers: Headers;
            db: drizzle_orm_libsql.LibSQLDatabase<typeof ______db_schema> & {
                $client: _libsql_client.Client;
            };
            session: next_auth.Session | null;
        };
        meta: object;
        errorShape: {
            data: {
                zodError: zod.ZodFlattenedError<unknown, string> | null;
                code: _trpc_server.TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: _trpc_server.TRPC_ERROR_CODE_NUMBER;
        };
        transformer: true;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        getAllTagsCurrentUser: _trpc_server.TRPCQueryProcedure<{
            input: void;
            output: {
                id: number;
                name: string;
                createdAt: Date;
                userId: string;
                icon: string;
                color: string;
            }[];
            meta: object;
        }>;
        create: _trpc_server.TRPCMutationProcedure<{
            input: {
                name: string;
                color: string;
                icon: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateTagToDailyLog: _trpc_server.TRPCMutationProcedure<{
            input: {
                tagId: number;
                dailyLogId: number;
            };
            output: true | _libsql_client.ResultSet;
            meta: object;
        }>;
        delete: _trpc_server.TRPCMutationProcedure<{
            input: number;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
    }>>;
    dailyLog: _trpc_server.TRPCBuiltRouter<{
        ctx: {
            headers: Headers;
            db: drizzle_orm_libsql.LibSQLDatabase<typeof ______db_schema> & {
                $client: _libsql_client.Client;
            };
            session: next_auth.Session | null;
        };
        meta: object;
        errorShape: {
            data: {
                zodError: zod.ZodFlattenedError<unknown, string> | null;
                code: _trpc_server.TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: _trpc_server.TRPC_ERROR_CODE_NUMBER;
        };
        transformer: true;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        getAllUser: _trpc_server.TRPCQueryProcedure<{
            input: string;
            output: {
                date: string;
                id: number;
                notes: string | null;
                image: string | null;
                createdAt: Date;
                updatedAt: Date | null;
                userId: string;
                sleep: string | null;
                morningWeight: string | null;
                fastedBloodGlucose: string | null;
                sleepQuality: string | null;
                isHiit: boolean | null;
                isCardio: boolean | null;
                isLift: boolean | null;
                isLiss: boolean | null;
                isStarred: boolean | null;
                hiit: string | null;
                cardio: string | null;
                weight: string | null;
                liss: string | null;
                posing: string | null;
                steps: string | null;
                sauna: string | null;
                coldPlunge: string | null;
                cardioType: string | null;
                frontImage: string | null;
                sideImage: string | null;
                backImage: string | null;
                frontPoseImage: string | null;
                sidePoseImage: string | null;
                backPoseImage: string | null;
                spareImageOne: string | null;
                spareImageTwo: string | null;
                waistMeasurement: string | null;
                nap: string | null;
                tags: {
                    id: number;
                    dailyLogId: number;
                    tagId: number;
                    tag: {
                        id: number;
                        name: string;
                        createdAt: Date;
                        userId: string;
                        icon: string;
                        color: string;
                    };
                }[];
                supplements: {
                    id: number;
                    notes: string | null;
                    createdAt: Date;
                    time: string | null;
                    supplementId: number;
                    unit: string | null;
                    dailyLogId: number;
                    amount: string | null;
                    supplement: {
                        id: number;
                        name: string | null;
                        notes: string | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                        userId: string | null;
                        favouriteAt: Date | null;
                        deletedAt: Date | null;
                        hiddenAt: Date | null;
                        isAusFood: boolean | null;
                        isAllStores: boolean | null;
                        serveSize: string | null;
                        serveUnit: string | null;
                        publicFoodKey: string | null;
                        classification: string | null;
                        foodName: string | null;
                        caloriesWFibre: string | null;
                        caloriesWOFibre: string | null;
                        protein: string | null;
                        fatTotal: string | null;
                        totalDietaryFibre: string | null;
                        totalSugars: string | null;
                        starch: string | null;
                        resistantStarch: string | null;
                        availableCarbohydrateWithoutSugarAlcohols: string | null;
                        availableCarbohydrateWithSugarAlcohols: string | null;
                        isUserCreated: boolean | null;
                        isSupplement: boolean | null;
                        isPrivate: boolean | null;
                        viewableBy: string | null;
                        intervale: string | null;
                    };
                }[];
                dailyMeals: {
                    date: Date | null;
                    id: number;
                    createdAt: Date;
                    recipeId: number | null;
                    dailyLogId: number;
                    mealIndex: number | null;
                    vegeCalories: string | null;
                    veges: string | null;
                    recipe: {
                        id: number;
                        name: string | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                        serveUnit: string | null;
                        isUserCreated: boolean | null;
                        index: number | null;
                        serve: string | null;
                        note: string | null;
                        userPlanId: number | null;
                        dailyLogId: number | null;
                        mealIndex: number | null;
                        dailyMealId: number | null;
                        recipeIndex: number | null;
                        parentId: number | null;
                        isLog: boolean | null;
                    }[];
                    ingredients: {
                        id: number;
                        name: string | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                        serveUnit: string | null;
                        isUserCreated: boolean | null;
                        ingredientId: number | null;
                        alternateId: number | null;
                        serve: string | null;
                        note: string | null;
                        userPlanId: number | null;
                        dailyLogId: number | null;
                        mealIndex: number | null;
                        dailyMealId: number | null;
                        recipeIndex: number | null;
                        ingredient: {
                            id: number;
                            name: string | null;
                            notes: string | null;
                            createdAt: Date;
                            updatedAt: Date | null;
                            userId: string | null;
                            favouriteAt: Date | null;
                            deletedAt: Date | null;
                            hiddenAt: Date | null;
                            isAusFood: boolean | null;
                            isAllStores: boolean | null;
                            serveSize: string | null;
                            serveUnit: string | null;
                            publicFoodKey: string | null;
                            classification: string | null;
                            foodName: string | null;
                            caloriesWFibre: string | null;
                            caloriesWOFibre: string | null;
                            protein: string | null;
                            fatTotal: string | null;
                            totalDietaryFibre: string | null;
                            totalSugars: string | null;
                            starch: string | null;
                            resistantStarch: string | null;
                            availableCarbohydrateWithoutSugarAlcohols: string | null;
                            availableCarbohydrateWithSugarAlcohols: string | null;
                            isUserCreated: boolean | null;
                            isSupplement: boolean | null;
                            isPrivate: boolean | null;
                            viewableBy: string | null;
                            intervale: string | null;
                        } | null;
                    }[];
                }[];
                waterLogs: {
                    id: number;
                    createdAt: Date;
                    dailyLogId: number;
                    amount: string | null;
                }[];
                poopLogs: {
                    id: number;
                    createdAt: Date;
                    dailyLogId: number;
                }[];
            }[];
            meta: object;
        }>;
        getAllCurrentUser: _trpc_server.TRPCQueryProcedure<{
            input: {
                id: string;
            } | undefined;
            output: {
                date: string;
                id: number;
                notes: string | null;
                image: string | null;
                createdAt: Date;
                updatedAt: Date | null;
                userId: string;
                sleep: string | null;
                morningWeight: string | null;
                fastedBloodGlucose: string | null;
                sleepQuality: string | null;
                isHiit: boolean | null;
                isCardio: boolean | null;
                isLift: boolean | null;
                isLiss: boolean | null;
                isStarred: boolean | null;
                hiit: string | null;
                cardio: string | null;
                weight: string | null;
                liss: string | null;
                posing: string | null;
                steps: string | null;
                sauna: string | null;
                coldPlunge: string | null;
                cardioType: string | null;
                frontImage: string | null;
                sideImage: string | null;
                backImage: string | null;
                frontPoseImage: string | null;
                sidePoseImage: string | null;
                backPoseImage: string | null;
                spareImageOne: string | null;
                spareImageTwo: string | null;
                waistMeasurement: string | null;
                nap: string | null;
                tags: {
                    id: number;
                    dailyLogId: number;
                    tagId: number;
                    tag: {
                        id: number;
                        name: string;
                        createdAt: Date;
                        userId: string;
                        icon: string;
                        color: string;
                    };
                }[];
                supplements: {
                    id: number;
                    notes: string | null;
                    createdAt: Date;
                    time: string | null;
                    supplementId: number;
                    unit: string | null;
                    dailyLogId: number;
                    amount: string | null;
                    supplement: {
                        id: number;
                        name: string | null;
                        notes: string | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                        userId: string | null;
                        favouriteAt: Date | null;
                        deletedAt: Date | null;
                        hiddenAt: Date | null;
                        isAusFood: boolean | null;
                        isAllStores: boolean | null;
                        serveSize: string | null;
                        serveUnit: string | null;
                        publicFoodKey: string | null;
                        classification: string | null;
                        foodName: string | null;
                        caloriesWFibre: string | null;
                        caloriesWOFibre: string | null;
                        protein: string | null;
                        fatTotal: string | null;
                        totalDietaryFibre: string | null;
                        totalSugars: string | null;
                        starch: string | null;
                        resistantStarch: string | null;
                        availableCarbohydrateWithoutSugarAlcohols: string | null;
                        availableCarbohydrateWithSugarAlcohols: string | null;
                        isUserCreated: boolean | null;
                        isSupplement: boolean | null;
                        isPrivate: boolean | null;
                        viewableBy: string | null;
                        intervale: string | null;
                    };
                }[];
                dailyMeals: {
                    date: Date | null;
                    id: number;
                    createdAt: Date;
                    recipeId: number | null;
                    dailyLogId: number;
                    mealIndex: number | null;
                    vegeCalories: string | null;
                    veges: string | null;
                    recipe: {
                        id: number;
                        name: string | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                        serveUnit: string | null;
                        isUserCreated: boolean | null;
                        index: number | null;
                        serve: string | null;
                        note: string | null;
                        userPlanId: number | null;
                        dailyLogId: number | null;
                        mealIndex: number | null;
                        dailyMealId: number | null;
                        recipeIndex: number | null;
                        parentId: number | null;
                        isLog: boolean | null;
                    }[];
                    ingredients: {
                        id: number;
                        name: string | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                        serveUnit: string | null;
                        isUserCreated: boolean | null;
                        ingredientId: number | null;
                        alternateId: number | null;
                        serve: string | null;
                        note: string | null;
                        userPlanId: number | null;
                        dailyLogId: number | null;
                        mealIndex: number | null;
                        dailyMealId: number | null;
                        recipeIndex: number | null;
                        ingredient: {
                            id: number;
                            name: string | null;
                            notes: string | null;
                            createdAt: Date;
                            updatedAt: Date | null;
                            userId: string | null;
                            favouriteAt: Date | null;
                            deletedAt: Date | null;
                            hiddenAt: Date | null;
                            isAusFood: boolean | null;
                            isAllStores: boolean | null;
                            serveSize: string | null;
                            serveUnit: string | null;
                            publicFoodKey: string | null;
                            classification: string | null;
                            foodName: string | null;
                            caloriesWFibre: string | null;
                            caloriesWOFibre: string | null;
                            protein: string | null;
                            fatTotal: string | null;
                            totalDietaryFibre: string | null;
                            totalSugars: string | null;
                            starch: string | null;
                            resistantStarch: string | null;
                            availableCarbohydrateWithoutSugarAlcohols: string | null;
                            availableCarbohydrateWithSugarAlcohols: string | null;
                            isUserCreated: boolean | null;
                            isSupplement: boolean | null;
                            isPrivate: boolean | null;
                            viewableBy: string | null;
                            intervale: string | null;
                        } | null;
                    }[];
                }[];
                waterLogs: {
                    id: number;
                    createdAt: Date;
                    dailyLogId: number;
                    amount: string | null;
                }[];
                poopLogs: {
                    id: number;
                    createdAt: Date;
                    dailyLogId: number;
                }[];
            }[] | null;
            meta: object;
        }>;
        getSimple: _trpc_server.TRPCQueryProcedure<{
            input: number;
            output: {
                date: string;
                id: number;
                notes: string | null;
                image: string | null;
                createdAt: Date;
                updatedAt: Date | null;
                userId: string;
                sleep: string | null;
                morningWeight: string | null;
                fastedBloodGlucose: string | null;
                sleepQuality: string | null;
                isHiit: boolean | null;
                isCardio: boolean | null;
                isLift: boolean | null;
                isLiss: boolean | null;
                isStarred: boolean | null;
                hiit: string | null;
                cardio: string | null;
                weight: string | null;
                liss: string | null;
                posing: string | null;
                steps: string | null;
                sauna: string | null;
                coldPlunge: string | null;
                cardioType: string | null;
                frontImage: string | null;
                sideImage: string | null;
                backImage: string | null;
                frontPoseImage: string | null;
                sidePoseImage: string | null;
                backPoseImage: string | null;
                spareImageOne: string | null;
                spareImageTwo: string | null;
                waistMeasurement: string | null;
                nap: string | null;
            } | undefined;
            meta: object;
        }>;
        get: _trpc_server.TRPCQueryProcedure<{
            input: number;
            output: {
                date: string;
                id: number;
                notes: string | null;
                image: string | null;
                createdAt: Date;
                updatedAt: Date | null;
                userId: string;
                sleep: string | null;
                morningWeight: string | null;
                fastedBloodGlucose: string | null;
                sleepQuality: string | null;
                isHiit: boolean | null;
                isCardio: boolean | null;
                isLift: boolean | null;
                isLiss: boolean | null;
                isStarred: boolean | null;
                hiit: string | null;
                cardio: string | null;
                weight: string | null;
                liss: string | null;
                posing: string | null;
                steps: string | null;
                sauna: string | null;
                coldPlunge: string | null;
                cardioType: string | null;
                frontImage: string | null;
                sideImage: string | null;
                backImage: string | null;
                frontPoseImage: string | null;
                sidePoseImage: string | null;
                backPoseImage: string | null;
                spareImageOne: string | null;
                spareImageTwo: string | null;
                waistMeasurement: string | null;
                nap: string | null;
                tags: {
                    id: number;
                    dailyLogId: number;
                    tagId: number;
                    tag: {
                        id: number;
                        name: string;
                        createdAt: Date;
                        userId: string;
                        icon: string;
                        color: string;
                    };
                }[];
                supplements: {
                    id: number;
                    notes: string | null;
                    createdAt: Date;
                    time: string | null;
                    supplementId: number;
                    unit: string | null;
                    dailyLogId: number;
                    amount: string | null;
                    supplement: {
                        id: number;
                        name: string | null;
                        notes: string | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                        userId: string | null;
                        favouriteAt: Date | null;
                        deletedAt: Date | null;
                        hiddenAt: Date | null;
                        isAusFood: boolean | null;
                        isAllStores: boolean | null;
                        serveSize: string | null;
                        serveUnit: string | null;
                        publicFoodKey: string | null;
                        classification: string | null;
                        foodName: string | null;
                        caloriesWFibre: string | null;
                        caloriesWOFibre: string | null;
                        protein: string | null;
                        fatTotal: string | null;
                        totalDietaryFibre: string | null;
                        totalSugars: string | null;
                        starch: string | null;
                        resistantStarch: string | null;
                        availableCarbohydrateWithoutSugarAlcohols: string | null;
                        availableCarbohydrateWithSugarAlcohols: string | null;
                        isUserCreated: boolean | null;
                        isSupplement: boolean | null;
                        isPrivate: boolean | null;
                        viewableBy: string | null;
                        intervale: string | null;
                    };
                }[];
                dailyMeals: {
                    date: Date | null;
                    id: number;
                    createdAt: Date;
                    recipeId: number | null;
                    dailyLogId: number;
                    mealIndex: number | null;
                    vegeCalories: string | null;
                    veges: string | null;
                    recipe: {
                        id: number;
                        name: string | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                        serveUnit: string | null;
                        isUserCreated: boolean | null;
                        index: number | null;
                        serve: string | null;
                        note: string | null;
                        userPlanId: number | null;
                        dailyLogId: number | null;
                        mealIndex: number | null;
                        dailyMealId: number | null;
                        recipeIndex: number | null;
                        parentId: number | null;
                        isLog: boolean | null;
                    }[];
                    ingredients: {
                        id: number;
                        name: string | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                        serveUnit: string | null;
                        isUserCreated: boolean | null;
                        ingredientId: number | null;
                        alternateId: number | null;
                        serve: string | null;
                        note: string | null;
                        userPlanId: number | null;
                        dailyLogId: number | null;
                        mealIndex: number | null;
                        dailyMealId: number | null;
                        recipeIndex: number | null;
                        ingredient: {
                            id: number;
                            name: string | null;
                            notes: string | null;
                            createdAt: Date;
                            updatedAt: Date | null;
                            userId: string | null;
                            favouriteAt: Date | null;
                            deletedAt: Date | null;
                            hiddenAt: Date | null;
                            isAusFood: boolean | null;
                            isAllStores: boolean | null;
                            serveSize: string | null;
                            serveUnit: string | null;
                            publicFoodKey: string | null;
                            classification: string | null;
                            foodName: string | null;
                            caloriesWFibre: string | null;
                            caloriesWOFibre: string | null;
                            protein: string | null;
                            fatTotal: string | null;
                            totalDietaryFibre: string | null;
                            totalSugars: string | null;
                            starch: string | null;
                            resistantStarch: string | null;
                            availableCarbohydrateWithoutSugarAlcohols: string | null;
                            availableCarbohydrateWithSugarAlcohols: string | null;
                            isUserCreated: boolean | null;
                            isSupplement: boolean | null;
                            isPrivate: boolean | null;
                            viewableBy: string | null;
                            intervale: string | null;
                        } | null;
                    }[];
                }[];
                waterLogs: {
                    id: number;
                    createdAt: Date;
                    dailyLogId: number;
                    amount: string | null;
                }[];
                poopLogs: {
                    id: number;
                    createdAt: Date;
                    dailyLogId: number;
                }[];
            } | undefined;
            meta: object;
        }>;
        update: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
                date: string;
                userId: string;
                morningWeight?: string | undefined;
                notes?: string | undefined;
                sleep?: string | undefined;
                sleepQuality?: string | undefined;
                fastedBloodGlucose?: string | undefined;
                nap?: string | undefined;
                waistMeasurement?: string | undefined;
                isHiit?: boolean | undefined;
                isCardio?: boolean | undefined;
                isLift?: boolean | undefined;
                isLiss?: boolean | undefined;
                image?: string | undefined;
            };
            output: {
                res: _libsql_client.ResultSet;
            };
            meta: object;
        }>;
        updateIsStarred: _trpc_server.TRPCMutationProcedure<{
            input: {
                date: string;
                isStarred: boolean;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateSupplement: _trpc_server.TRPCMutationProcedure<{
            input: {
                date: string;
                suppId: number;
                amount: number;
                unit: string;
            };
            output: {
                id: number;
            }[];
            meta: object;
        }>;
        updateNote: _trpc_server.TRPCMutationProcedure<{
            input: {
                date: string;
                notes: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updatePosing: _trpc_server.TRPCMutationProcedure<{
            input: {
                date: string;
                posing: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateSleep: _trpc_server.TRPCMutationProcedure<{
            input: {
                date: string;
                sleep: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateSleepQuality: _trpc_server.TRPCMutationProcedure<{
            input: {
                date: string;
                sleepQuality: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateSteps: _trpc_server.TRPCMutationProcedure<{
            input: {
                date: string;
                steps: string;
            };
            output: _libsql_client.ResultSet | undefined;
            meta: object;
        }>;
        updateSauna: _trpc_server.TRPCMutationProcedure<{
            input: {
                date: string;
                sauna: string;
            };
            output: _libsql_client.ResultSet | undefined;
            meta: object;
        }>;
        updateColdPlunge: _trpc_server.TRPCMutationProcedure<{
            input: {
                date: string;
                coldPlunge: string;
            };
            output: _libsql_client.ResultSet | undefined;
            meta: object;
        }>;
        updateNap: _trpc_server.TRPCMutationProcedure<{
            input: {
                date: string;
                nap: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateHiit: _trpc_server.TRPCMutationProcedure<{
            input: {
                date: string;
                hiit: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateCardio: _trpc_server.TRPCMutationProcedure<{
            input: {
                date: string;
                cardio: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateWeightTraining: _trpc_server.TRPCMutationProcedure<{
            input: {
                date: string;
                weight: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateLiss: _trpc_server.TRPCMutationProcedure<{
            input: {
                date: string;
                liss: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateWaistMeasurement: _trpc_server.TRPCMutationProcedure<{
            input: {
                date: string;
                waistMeasurement: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateWeight: _trpc_server.TRPCMutationProcedure<{
            input: {
                date: string;
                morningWeight: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateBloodGlucose: _trpc_server.TRPCMutationProcedure<{
            input: {
                date: string;
                fastedBloodGlucose: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateFrontImage: _trpc_server.TRPCMutationProcedure<{
            input: {
                logId: number;
                image: string;
            };
            output: boolean;
            meta: object;
        }>;
        updateSideImage: _trpc_server.TRPCMutationProcedure<{
            input: {
                logId: number;
                image: string;
            };
            output: boolean;
            meta: object;
        }>;
        updateBackImage: _trpc_server.TRPCMutationProcedure<{
            input: {
                logId: number;
                image: string;
            };
            output: boolean;
            meta: object;
        }>;
        updateBodyBuilderImage: _trpc_server.TRPCMutationProcedure<{
            input: {
                date: string;
                image: string;
                name: string;
                userId: string;
            };
            output: {
                id: number;
            }[];
            meta: object;
        }>;
        updateImage: _trpc_server.TRPCMutationProcedure<{
            input: {
                date: string;
                image: string;
            };
            output: boolean;
            meta: object;
        }>;
        addWaterLog: _trpc_server.TRPCMutationProcedure<{
            input: {
                date: string;
                amount: number;
            };
            output: {
                id: number;
            }[];
            meta: object;
        }>;
        deleteWaterLog: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        addPoopLog: _trpc_server.TRPCMutationProcedure<{
            input: {
                date: string;
            };
            output: {
                id: number;
            }[];
            meta: object;
        }>;
        deletePoopLog: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        create: _trpc_server.TRPCMutationProcedure<{
            input: {
                date: string;
                userId: string;
                morningWeight?: string | undefined;
                fastedBloodGlucose?: string | undefined;
                notes?: string | undefined;
                sleep?: string | undefined;
                sleepQuality?: string | undefined;
                nap?: string | undefined;
                waistMeasurement?: string | undefined;
                isHiit?: boolean | undefined;
                isCardio?: boolean | undefined;
                isLift?: boolean | undefined;
                isLiss?: boolean | undefined;
                image?: string | undefined;
            };
            output: {
                res: {
                    id: number;
                }[];
            };
            meta: object;
        }>;
        deleteMeal: _trpc_server.TRPCMutationProcedure<{
            input: {
                mealIndex: number;
                logId: number;
            };
            output: boolean;
            meta: object;
        }>;
        copyWeek: _trpc_server.TRPCMutationProcedure<{
            input: {
                userId: string;
                logId: number;
            };
            output: boolean;
            meta: object;
        }>;
        clearDay: _trpc_server.TRPCMutationProcedure<{
            input: {
                logId: number;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        addUserCreatedRecipe: _trpc_server.TRPCMutationProcedure<{
            input: {
                mealIndex: number;
                logId: number;
                recipe: {
                    name: string;
                    description: string;
                    image: string;
                    notes: string;
                    recipeCategory: string;
                    calories: number;
                    ingredients: {
                        ingredientId: number;
                        alternateId: string;
                        note: string;
                        serveSize: string;
                        serveUnit: string;
                        index: number;
                        isAlternate?: boolean | undefined;
                    }[];
                };
            };
            output: {
                meal: {
                    id: number;
                }[];
                recipe: {
                    id: number;
                }[];
                ingredient: {
                    id: number;
                }[];
            } | undefined;
            meta: object;
        }>;
        addMeal: _trpc_server.TRPCMutationProcedure<{
            input: {
                userId: string;
                planId: number;
                mealIndex: number | null;
                date: Date;
                logId: number | null;
                recipeIndex?: number | null | undefined;
                recipeId?: number | null | undefined;
            };
            output: {
                meal: {
                    id: number;
                }[];
                recipe?: undefined;
                ingredient?: undefined;
            } | {
                meal: {
                    id: number;
                }[];
                recipe: {
                    id: number;
                }[];
                ingredient: {
                    id: number;
                }[];
            } | undefined;
            meta: object;
        }>;
        delete: _trpc_server.TRPCMutationProcedure<{
            input: number;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        deleteAll: _trpc_server.TRPCMutationProcedure<{
            input: string;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
    }>>;
    user: _trpc_server.TRPCBuiltRouter<{
        ctx: {
            headers: Headers;
            db: drizzle_orm_libsql.LibSQLDatabase<typeof ______db_schema> & {
                $client: _libsql_client.Client;
            };
            session: next_auth.Session | null;
        };
        meta: object;
        errorShape: {
            data: {
                zodError: zod.ZodFlattenedError<unknown, string> | null;
                code: _trpc_server.TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: _trpc_server.TRPC_ERROR_CODE_NUMBER;
        };
        transformer: true;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        getNotifications: _trpc_server.TRPCQueryProcedure<{
            input: {
                userId: string;
            };
            output: {
                type: string | null;
                id: number;
                createdAt: Date;
                userId: string;
                interval: string | null;
                sleep: string | null;
            }[];
            meta: object;
        }>;
        toggleNotification: _trpc_server.TRPCMutationProcedure<{
            input: {
                userId: string;
                type: string;
                interval: string;
                sleep?: string | undefined;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateNotification: _trpc_server.TRPCMutationProcedure<{
            input: {
                interval: string;
                id: number;
                sleep?: string | undefined;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        getAdminLogs: _trpc_server.TRPCQueryProcedure<{
            input: void;
            output: {
                user: string | null;
                id: number;
                notes: string | null;
                createdAt: Date;
                userId: string | null;
                objectId: number | null;
                task: string | null;
            }[];
            meta: object;
        }>;
        deleteAdminLog: _trpc_server.TRPCMutationProcedure<{
            input: number;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        createUser: _trpc_server.TRPCMutationProcedure<{
            input: {
                email: string;
                password: string;
                firstName: string;
                lastName: string;
                birthDate?: Date | null | undefined;
                isCreator?: boolean | undefined;
                isTrainer?: boolean | undefined;
                isRoot?: boolean | undefined;
            };
            output: {
                user: string;
                password: string;
            };
            meta: object;
        }>;
        deleteUser: _trpc_server.TRPCMutationProcedure<{
            input: string;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        createFakeUsers: _trpc_server.TRPCMutationProcedure<{
            input: void;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateRoot: _trpc_server.TRPCMutationProcedure<{
            input: {
                isRoot: boolean;
                id: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateRoleBodyBuilderImages: _trpc_server.TRPCMutationProcedure<{
            input: {
                userId: string;
            };
            output: {
                id: number;
                name: string | null;
                createdAt: Date;
                updatedAt: Date | null;
                userId: string | null;
            } | undefined;
            meta: object;
        }>;
        updateRoleSupplementDisclaimer: _trpc_server.TRPCMutationProcedure<{
            input: {
                userId: string;
            };
            output: {
                id: number;
                name: string | null;
                createdAt: Date;
                updatedAt: Date | null;
                userId: string | null;
            } | undefined;
            meta: object;
        }>;
        updateRoleSupplements: _trpc_server.TRPCMutationProcedure<{
            input: {
                userId: string;
            };
            output: {
                id: number;
                name: string | null;
                createdAt: Date;
                updatedAt: Date | null;
                userId: string | null;
            } | undefined;
            meta: object;
        }>;
        updateRoleCreateMeals: _trpc_server.TRPCMutationProcedure<{
            input: {
                userId: string;
            };
            output: {
                id: number;
                name: string | null;
                createdAt: Date;
                updatedAt: Date | null;
                userId: string | null;
            } | undefined;
            meta: object;
        }>;
        updateRoleAdmin: _trpc_server.TRPCMutationProcedure<{
            input: {
                userId: string;
            };
            output: {
                id: number;
                name: string | null;
                createdAt: Date;
                updatedAt: Date | null;
                userId: string | null;
            } | undefined;
            meta: object;
        }>;
        updateChartRange: _trpc_server.TRPCMutationProcedure<{
            input: {
                range: number;
                id: number;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateWater: _trpc_server.TRPCMutationProcedure<{
            input: {
                water: number;
                id: number;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateIsPosing: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: string;
                isPosing: boolean;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateIsBloodGlucose: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: string;
                isBloodGlucose: boolean;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateIsSleep: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: string;
                isSleep: boolean;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateIsSleepQuality: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: string;
                isSleepQuality: boolean;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateIsNap: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: string;
                isNap: boolean;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateIsWeightTraining: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: string;
                isWeightTraining: boolean;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateIsHiit: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: string;
                isHiit: boolean;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateIsLiss: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: string;
                isLiss: boolean;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateIsNote: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: string;
                isNote: boolean;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateIsSauna: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: string;
                isSauna: boolean;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateIsColdPlunge: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: string;
                isColdPlunge: boolean;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateIsSteps: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: string;
                isSteps: boolean;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateTrainer: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: string;
                isTrainer: boolean;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateFirstName: _trpc_server.TRPCMutationProcedure<{
            input: {
                firstName: string;
                id: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateLastName: _trpc_server.TRPCMutationProcedure<{
            input: {
                lastName: string;
                id: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateEmail: _trpc_server.TRPCMutationProcedure<{
            input: {
                email: string;
                id: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updatePassword: _trpc_server.TRPCMutationProcedure<{
            input: {
                password: string;
                id: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        getBasic: _trpc_server.TRPCQueryProcedure<{
            input: string;
            output: {
                id: string;
                name: string | null;
                firstName: string | null;
                lastName: string | null;
                clerkId: string | null;
                birthDate: Date | null;
                gender: string | null;
                address: string | null;
                notes: string | null;
                instagram: string | null;
                openLifter: string | null;
                phone: string | null;
                email: string | null;
                emailVerified: Date | null;
                currentPlanId: number | null;
                image: string | null;
                isFake: boolean | null;
                isTrainer: boolean | null;
                isRoot: boolean | null;
                isCreator: boolean | null;
                isAllTrainers: boolean | null;
                createdAt: Date;
                updatedAt: Date | null;
                roles: {
                    id: number;
                    name: string | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                    userId: string | null;
                }[];
                trainers: {
                    userId: string;
                    trainerId: string;
                    trainer: {
                        id: string;
                        name: string | null;
                        firstName: string | null;
                        lastName: string | null;
                        clerkId: string | null;
                        birthDate: Date | null;
                        gender: string | null;
                        address: string | null;
                        notes: string | null;
                        instagram: string | null;
                        openLifter: string | null;
                        phone: string | null;
                        email: string | null;
                        emailVerified: Date | null;
                        password: string | null;
                        currentPlanId: number | null;
                        image: string | null;
                        isFake: boolean | null;
                        isTrainer: boolean | null;
                        isRoot: boolean | null;
                        isCreator: boolean | null;
                        isAllTrainers: boolean | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                    };
                }[];
                category: {
                    userId: string;
                    categoryId: number;
                    category: {
                        id: number;
                        name: string | null;
                    };
                }[];
            } | undefined;
            meta: object;
        }>;
        getAllYour: _trpc_server.TRPCQueryProcedure<{
            input: string | undefined;
            output: {
                id: string;
                name: string | null;
                firstName: string | null;
                lastName: string | null;
                clerkId: string | null;
                birthDate: Date | null;
                gender: string | null;
                address: string | null;
                notes: string | null;
                instagram: string | null;
                openLifter: string | null;
                phone: string | null;
                email: string | null;
                emailVerified: Date | null;
                currentPlanId: number | null;
                image: string | null;
                isFake: boolean | null;
                isTrainer: boolean | null;
                isRoot: boolean | null;
                isCreator: boolean | null;
                isAllTrainers: boolean | null;
                createdAt: Date;
                updatedAt: Date | null;
                roles: {
                    id: number;
                    name: string | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                    userId: string | null;
                }[];
                trainers: {
                    userId: string;
                    trainerId: string;
                    trainer: {
                        id: string;
                        name: string | null;
                        firstName: string | null;
                        lastName: string | null;
                        clerkId: string | null;
                        birthDate: Date | null;
                        gender: string | null;
                        address: string | null;
                        notes: string | null;
                        instagram: string | null;
                        openLifter: string | null;
                        phone: string | null;
                        email: string | null;
                        emailVerified: Date | null;
                        password: string | null;
                        currentPlanId: number | null;
                        image: string | null;
                        isFake: boolean | null;
                        isTrainer: boolean | null;
                        isRoot: boolean | null;
                        isCreator: boolean | null;
                        isAllTrainers: boolean | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                    };
                }[];
                category: {
                    userId: string;
                    categoryId: number;
                    category: {
                        id: number;
                        name: string | null;
                    };
                }[];
            }[];
            meta: object;
        }>;
        getAll: _trpc_server.TRPCQueryProcedure<{
            input: void;
            output: {
                id: string;
                name: string | null;
                firstName: string | null;
                lastName: string | null;
                clerkId: string | null;
                birthDate: Date | null;
                gender: string | null;
                address: string | null;
                notes: string | null;
                instagram: string | null;
                openLifter: string | null;
                phone: string | null;
                email: string | null;
                emailVerified: Date | null;
                currentPlanId: number | null;
                image: string | null;
                isFake: boolean | null;
                isTrainer: boolean | null;
                isRoot: boolean | null;
                isCreator: boolean | null;
                isAllTrainers: boolean | null;
                createdAt: Date;
                updatedAt: Date | null;
                roles: {
                    id: number;
                    name: string | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                    userId: string | null;
                }[];
                trainers: {
                    userId: string;
                    trainerId: string;
                    trainer: {
                        id: string;
                        name: string | null;
                        firstName: string | null;
                        lastName: string | null;
                        clerkId: string | null;
                        birthDate: Date | null;
                        gender: string | null;
                        address: string | null;
                        notes: string | null;
                        instagram: string | null;
                        openLifter: string | null;
                        phone: string | null;
                        email: string | null;
                        emailVerified: Date | null;
                        password: string | null;
                        currentPlanId: number | null;
                        image: string | null;
                        isFake: boolean | null;
                        isTrainer: boolean | null;
                        isRoot: boolean | null;
                        isCreator: boolean | null;
                        isAllTrainers: boolean | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                    };
                }[];
                category: {
                    userId: string;
                    categoryId: number;
                    category: {
                        id: number;
                        name: string | null;
                    };
                }[];
            }[];
            meta: object;
        }>;
        checkEmail: _trpc_server.TRPCMutationProcedure<{
            input: string;
            output: boolean;
            meta: object;
        }>;
        getGaurenteed: _trpc_server.TRPCQueryProcedure<{
            input: string;
            output: {
                id: string;
                name: string | null;
                firstName: string | null;
                lastName: string | null;
                clerkId: string | null;
                birthDate: Date | null;
                gender: string | null;
                address: string | null;
                notes: string | null;
                instagram: string | null;
                openLifter: string | null;
                phone: string | null;
                email: string | null;
                emailVerified: Date | null;
                currentPlanId: number | null;
                image: string | null;
                isFake: boolean | null;
                isTrainer: boolean | null;
                isRoot: boolean | null;
                isCreator: boolean | null;
                isAllTrainers: boolean | null;
                createdAt: Date;
                updatedAt: Date | null;
                roles: {
                    id: number;
                    name: string | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                    userId: string | null;
                }[];
                userPlans: {
                    id: number;
                    name: string;
                    notes: string;
                    image: string;
                    createdAt: Date;
                    updatedAt: Date | null;
                    description: string;
                    userId: string;
                    finishedAt: Date | null;
                    startAt: Date | null;
                    isActive: boolean | null;
                    numberOfMeals: number | null;
                    creatorId: string;
                    favouriteAt: Date | null;
                    deletedAt: Date | null;
                    hiddenAt: Date | null;
                    userMeals: {
                        id: number;
                        createdAt: Date;
                        updatedAt: Date | null;
                        protein: string | null;
                        calories: string | null;
                        note: string | null;
                        userPlanId: number;
                        mealIndex: number | null;
                        vegeCalories: string | null;
                        veges: string | null;
                        vegeNotes: string | null;
                        mealTitle: string | null;
                        targetProtein: string | null;
                        targetCalories: string | null;
                    }[];
                    userRecipes: {
                        id: number;
                        name: string | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                        serveUnit: string | null;
                        isUserCreated: boolean | null;
                        index: number | null;
                        serve: string | null;
                        note: string | null;
                        userPlanId: number | null;
                        dailyLogId: number | null;
                        mealIndex: number | null;
                        dailyMealId: number | null;
                        recipeIndex: number | null;
                        parentId: number | null;
                        isLog: boolean | null;
                    }[];
                    userIngredients: {
                        id: number;
                        name: string | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                        serveUnit: string | null;
                        isUserCreated: boolean | null;
                        ingredientId: number | null;
                        alternateId: number | null;
                        serve: string | null;
                        note: string | null;
                        userPlanId: number | null;
                        dailyLogId: number | null;
                        mealIndex: number | null;
                        dailyMealId: number | null;
                        recipeIndex: number | null;
                        ingredient: {
                            id: number;
                            name: string | null;
                            notes: string | null;
                            createdAt: Date;
                            updatedAt: Date | null;
                            userId: string | null;
                            favouriteAt: Date | null;
                            deletedAt: Date | null;
                            hiddenAt: Date | null;
                            isAusFood: boolean | null;
                            isAllStores: boolean | null;
                            serveSize: string | null;
                            serveUnit: string | null;
                            publicFoodKey: string | null;
                            classification: string | null;
                            foodName: string | null;
                            caloriesWFibre: string | null;
                            caloriesWOFibre: string | null;
                            protein: string | null;
                            fatTotal: string | null;
                            totalDietaryFibre: string | null;
                            totalSugars: string | null;
                            starch: string | null;
                            resistantStarch: string | null;
                            availableCarbohydrateWithoutSugarAlcohols: string | null;
                            availableCarbohydrateWithSugarAlcohols: string | null;
                            isUserCreated: boolean | null;
                            isSupplement: boolean | null;
                            isPrivate: boolean | null;
                            viewableBy: string | null;
                            intervale: string | null;
                        } | null;
                        alternateIngredient: {
                            id: number;
                            name: string | null;
                            notes: string | null;
                            createdAt: Date;
                            updatedAt: Date | null;
                            userId: string | null;
                            favouriteAt: Date | null;
                            deletedAt: Date | null;
                            hiddenAt: Date | null;
                            isAusFood: boolean | null;
                            isAllStores: boolean | null;
                            serveSize: string | null;
                            serveUnit: string | null;
                            publicFoodKey: string | null;
                            classification: string | null;
                            foodName: string | null;
                            caloriesWFibre: string | null;
                            caloriesWOFibre: string | null;
                            protein: string | null;
                            fatTotal: string | null;
                            totalDietaryFibre: string | null;
                            totalSugars: string | null;
                            starch: string | null;
                            resistantStarch: string | null;
                            availableCarbohydrateWithoutSugarAlcohols: string | null;
                            availableCarbohydrateWithSugarAlcohols: string | null;
                            isUserCreated: boolean | null;
                            isSupplement: boolean | null;
                            isPrivate: boolean | null;
                            viewableBy: string | null;
                            intervale: string | null;
                        } | null;
                    }[];
                }[];
                images: {
                    date: string;
                    id: number;
                    name: string;
                    image: string;
                    createdAt: Date;
                    userId: string;
                }[];
                settings: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date | null;
                    userId: string;
                    isHiit: boolean | null;
                    isLiss: boolean | null;
                    defaultWater: string | null;
                    defaultChartRange: string | null;
                    isPosing: boolean | null;
                    isBloodGlucose: boolean | null;
                    isSleep: boolean | null;
                    isSleepQuality: boolean | null;
                    isNap: boolean | null;
                    isWeightTraining: boolean | null;
                    isNotes: boolean | null;
                    isSteps: boolean | null;
                    isSauna: boolean | null;
                    isColdPlunge: boolean | null;
                };
                supplementStacks: {
                    id: number;
                    name: string | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                    userId: string;
                    time: string | null;
                    isTemplate: boolean | null;
                    supplements: {
                        id: number;
                        supplementId: number;
                        supplementStackId: number;
                        size: string | null;
                        unit: string | null;
                        supplement: {
                            id: number;
                            name: string | null;
                            notes: string | null;
                            createdAt: Date;
                            updatedAt: Date | null;
                            userId: string | null;
                            favouriteAt: Date | null;
                            deletedAt: Date | null;
                            hiddenAt: Date | null;
                            isAusFood: boolean | null;
                            isAllStores: boolean | null;
                            serveSize: string | null;
                            serveUnit: string | null;
                            publicFoodKey: string | null;
                            classification: string | null;
                            foodName: string | null;
                            caloriesWFibre: string | null;
                            caloriesWOFibre: string | null;
                            protein: string | null;
                            fatTotal: string | null;
                            totalDietaryFibre: string | null;
                            totalSugars: string | null;
                            starch: string | null;
                            resistantStarch: string | null;
                            availableCarbohydrateWithoutSugarAlcohols: string | null;
                            availableCarbohydrateWithSugarAlcohols: string | null;
                            isUserCreated: boolean | null;
                            isSupplement: boolean | null;
                            isPrivate: boolean | null;
                            viewableBy: string | null;
                            intervale: string | null;
                        };
                    }[];
                }[];
            };
            meta: object;
        }>;
        getByEmail: _trpc_server.TRPCQueryProcedure<{
            input: string;
            output: {
                id: string;
                name: string | null;
                firstName: string | null;
                lastName: string | null;
                clerkId: string | null;
                birthDate: Date | null;
                gender: string | null;
                address: string | null;
                notes: string | null;
                instagram: string | null;
                openLifter: string | null;
                phone: string | null;
                email: string | null;
                emailVerified: Date | null;
                currentPlanId: number | null;
                image: string | null;
                isFake: boolean | null;
                isTrainer: boolean | null;
                isRoot: boolean | null;
                isCreator: boolean | null;
                isAllTrainers: boolean | null;
                createdAt: Date;
                updatedAt: Date | null;
            } | undefined;
            meta: object;
        }>;
        get: _trpc_server.TRPCQueryProcedure<{
            input: string;
            output: {
                id: string;
                name: string | null;
                firstName: string | null;
                lastName: string | null;
                clerkId: string | null;
                birthDate: Date | null;
                gender: string | null;
                address: string | null;
                notes: string | null;
                instagram: string | null;
                openLifter: string | null;
                phone: string | null;
                email: string | null;
                emailVerified: Date | null;
                currentPlanId: number | null;
                image: string | null;
                isFake: boolean | null;
                isTrainer: boolean | null;
                isRoot: boolean | null;
                isCreator: boolean | null;
                isAllTrainers: boolean | null;
                createdAt: Date;
                updatedAt: Date | null;
                roles: {
                    id: number;
                    name: string | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                    userId: string | null;
                }[];
                trainers: {
                    userId: string;
                    trainerId: string;
                }[];
                userPlans: {
                    id: number;
                    name: string;
                    notes: string;
                    image: string;
                    createdAt: Date;
                    updatedAt: Date | null;
                    description: string;
                    userId: string;
                    finishedAt: Date | null;
                    startAt: Date | null;
                    isActive: boolean | null;
                    numberOfMeals: number | null;
                    creatorId: string;
                    favouriteAt: Date | null;
                    deletedAt: Date | null;
                    hiddenAt: Date | null;
                    userMeals: {
                        id: number;
                        createdAt: Date;
                        updatedAt: Date | null;
                        protein: string | null;
                        calories: string | null;
                        note: string | null;
                        userPlanId: number;
                        mealIndex: number | null;
                        vegeCalories: string | null;
                        veges: string | null;
                        vegeNotes: string | null;
                        mealTitle: string | null;
                        targetProtein: string | null;
                        targetCalories: string | null;
                    }[];
                    userRecipes: {
                        id: number;
                        name: string | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                        serveUnit: string | null;
                        isUserCreated: boolean | null;
                        index: number | null;
                        serve: string | null;
                        note: string | null;
                        userPlanId: number | null;
                        dailyLogId: number | null;
                        mealIndex: number | null;
                        dailyMealId: number | null;
                        recipeIndex: number | null;
                        parentId: number | null;
                        isLog: boolean | null;
                    }[];
                    userIngredients: {
                        id: number;
                        name: string | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                        serveUnit: string | null;
                        isUserCreated: boolean | null;
                        ingredientId: number | null;
                        alternateId: number | null;
                        serve: string | null;
                        note: string | null;
                        userPlanId: number | null;
                        dailyLogId: number | null;
                        mealIndex: number | null;
                        dailyMealId: number | null;
                        recipeIndex: number | null;
                        ingredient: {
                            id: number;
                            name: string | null;
                            notes: string | null;
                            createdAt: Date;
                            updatedAt: Date | null;
                            userId: string | null;
                            favouriteAt: Date | null;
                            deletedAt: Date | null;
                            hiddenAt: Date | null;
                            isAusFood: boolean | null;
                            isAllStores: boolean | null;
                            serveSize: string | null;
                            serveUnit: string | null;
                            publicFoodKey: string | null;
                            classification: string | null;
                            foodName: string | null;
                            caloriesWFibre: string | null;
                            caloriesWOFibre: string | null;
                            protein: string | null;
                            fatTotal: string | null;
                            totalDietaryFibre: string | null;
                            totalSugars: string | null;
                            starch: string | null;
                            resistantStarch: string | null;
                            availableCarbohydrateWithoutSugarAlcohols: string | null;
                            availableCarbohydrateWithSugarAlcohols: string | null;
                            isUserCreated: boolean | null;
                            isSupplement: boolean | null;
                            isPrivate: boolean | null;
                            viewableBy: string | null;
                            intervale: string | null;
                        } | null;
                        alternateIngredient: {
                            id: number;
                            name: string | null;
                            notes: string | null;
                            createdAt: Date;
                            updatedAt: Date | null;
                            userId: string | null;
                            favouriteAt: Date | null;
                            deletedAt: Date | null;
                            hiddenAt: Date | null;
                            isAusFood: boolean | null;
                            isAllStores: boolean | null;
                            serveSize: string | null;
                            serveUnit: string | null;
                            publicFoodKey: string | null;
                            classification: string | null;
                            foodName: string | null;
                            caloriesWFibre: string | null;
                            caloriesWOFibre: string | null;
                            protein: string | null;
                            fatTotal: string | null;
                            totalDietaryFibre: string | null;
                            totalSugars: string | null;
                            starch: string | null;
                            resistantStarch: string | null;
                            availableCarbohydrateWithoutSugarAlcohols: string | null;
                            availableCarbohydrateWithSugarAlcohols: string | null;
                            isUserCreated: boolean | null;
                            isSupplement: boolean | null;
                            isPrivate: boolean | null;
                            viewableBy: string | null;
                            intervale: string | null;
                        } | null;
                    }[];
                }[];
                images: {
                    date: string;
                    id: number;
                    name: string;
                    image: string;
                    createdAt: Date;
                    userId: string;
                }[];
                settings: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date | null;
                    userId: string;
                    isHiit: boolean | null;
                    isLiss: boolean | null;
                    defaultWater: string | null;
                    defaultChartRange: string | null;
                    isPosing: boolean | null;
                    isBloodGlucose: boolean | null;
                    isSleep: boolean | null;
                    isSleepQuality: boolean | null;
                    isNap: boolean | null;
                    isWeightTraining: boolean | null;
                    isNotes: boolean | null;
                    isSteps: boolean | null;
                    isSauna: boolean | null;
                    isColdPlunge: boolean | null;
                };
                supplementStacks: {
                    id: number;
                    name: string | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                    userId: string;
                    time: string | null;
                    isTemplate: boolean | null;
                    supplements: {
                        id: number;
                        supplementId: number;
                        supplementStackId: number;
                        size: string | null;
                        unit: string | null;
                        supplement: {
                            id: number;
                            name: string | null;
                            notes: string | null;
                            createdAt: Date;
                            updatedAt: Date | null;
                            userId: string | null;
                            favouriteAt: Date | null;
                            deletedAt: Date | null;
                            hiddenAt: Date | null;
                            isAusFood: boolean | null;
                            isAllStores: boolean | null;
                            serveSize: string | null;
                            serveUnit: string | null;
                            publicFoodKey: string | null;
                            classification: string | null;
                            foodName: string | null;
                            caloriesWFibre: string | null;
                            caloriesWOFibre: string | null;
                            protein: string | null;
                            fatTotal: string | null;
                            totalDietaryFibre: string | null;
                            totalSugars: string | null;
                            starch: string | null;
                            resistantStarch: string | null;
                            availableCarbohydrateWithoutSugarAlcohols: string | null;
                            availableCarbohydrateWithSugarAlcohols: string | null;
                            isUserCreated: boolean | null;
                            isSupplement: boolean | null;
                            isPrivate: boolean | null;
                            viewableBy: string | null;
                            intervale: string | null;
                        };
                    }[];
                }[];
            } | undefined;
            meta: object;
        }>;
        getCurrentUser: _trpc_server.TRPCQueryProcedure<{
            input: {
                id: string;
            } | undefined;
            output: {
                id: string;
                name: string | null;
                firstName: string | null;
                lastName: string | null;
                clerkId: string | null;
                birthDate: Date | null;
                gender: string | null;
                address: string | null;
                notes: string | null;
                instagram: string | null;
                openLifter: string | null;
                phone: string | null;
                email: string | null;
                emailVerified: Date | null;
                currentPlanId: number | null;
                image: string | null;
                isFake: boolean | null;
                isTrainer: boolean | null;
                isRoot: boolean | null;
                isCreator: boolean | null;
                isAllTrainers: boolean | null;
                createdAt: Date;
                updatedAt: Date | null;
                roles: {
                    id: number;
                    name: string | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                    userId: string | null;
                }[];
                userPlans: {
                    id: number;
                    name: string;
                    notes: string;
                    image: string;
                    createdAt: Date;
                    updatedAt: Date | null;
                    description: string;
                    userId: string;
                    finishedAt: Date | null;
                    startAt: Date | null;
                    isActive: boolean | null;
                    numberOfMeals: number | null;
                    creatorId: string;
                    favouriteAt: Date | null;
                    deletedAt: Date | null;
                    hiddenAt: Date | null;
                    userMeals: {
                        id: number;
                        createdAt: Date;
                        updatedAt: Date | null;
                        protein: string | null;
                        calories: string | null;
                        note: string | null;
                        userPlanId: number;
                        mealIndex: number | null;
                        vegeCalories: string | null;
                        veges: string | null;
                        vegeNotes: string | null;
                        mealTitle: string | null;
                        targetProtein: string | null;
                        targetCalories: string | null;
                    }[];
                    userRecipes: {
                        id: number;
                        name: string | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                        serveUnit: string | null;
                        isUserCreated: boolean | null;
                        index: number | null;
                        serve: string | null;
                        note: string | null;
                        userPlanId: number | null;
                        dailyLogId: number | null;
                        mealIndex: number | null;
                        dailyMealId: number | null;
                        recipeIndex: number | null;
                        parentId: number | null;
                        isLog: boolean | null;
                    }[];
                    userIngredients: {
                        id: number;
                        name: string | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                        serveUnit: string | null;
                        isUserCreated: boolean | null;
                        ingredientId: number | null;
                        alternateId: number | null;
                        serve: string | null;
                        note: string | null;
                        userPlanId: number | null;
                        dailyLogId: number | null;
                        mealIndex: number | null;
                        dailyMealId: number | null;
                        recipeIndex: number | null;
                        ingredient: {
                            id: number;
                            name: string | null;
                            notes: string | null;
                            createdAt: Date;
                            updatedAt: Date | null;
                            userId: string | null;
                            favouriteAt: Date | null;
                            deletedAt: Date | null;
                            hiddenAt: Date | null;
                            isAusFood: boolean | null;
                            isAllStores: boolean | null;
                            serveSize: string | null;
                            serveUnit: string | null;
                            publicFoodKey: string | null;
                            classification: string | null;
                            foodName: string | null;
                            caloriesWFibre: string | null;
                            caloriesWOFibre: string | null;
                            protein: string | null;
                            fatTotal: string | null;
                            totalDietaryFibre: string | null;
                            totalSugars: string | null;
                            starch: string | null;
                            resistantStarch: string | null;
                            availableCarbohydrateWithoutSugarAlcohols: string | null;
                            availableCarbohydrateWithSugarAlcohols: string | null;
                            isUserCreated: boolean | null;
                            isSupplement: boolean | null;
                            isPrivate: boolean | null;
                            viewableBy: string | null;
                            intervale: string | null;
                        } | null;
                        alternateIngredient: {
                            id: number;
                            name: string | null;
                            notes: string | null;
                            createdAt: Date;
                            updatedAt: Date | null;
                            userId: string | null;
                            favouriteAt: Date | null;
                            deletedAt: Date | null;
                            hiddenAt: Date | null;
                            isAusFood: boolean | null;
                            isAllStores: boolean | null;
                            serveSize: string | null;
                            serveUnit: string | null;
                            publicFoodKey: string | null;
                            classification: string | null;
                            foodName: string | null;
                            caloriesWFibre: string | null;
                            caloriesWOFibre: string | null;
                            protein: string | null;
                            fatTotal: string | null;
                            totalDietaryFibre: string | null;
                            totalSugars: string | null;
                            starch: string | null;
                            resistantStarch: string | null;
                            availableCarbohydrateWithoutSugarAlcohols: string | null;
                            availableCarbohydrateWithSugarAlcohols: string | null;
                            isUserCreated: boolean | null;
                            isSupplement: boolean | null;
                            isPrivate: boolean | null;
                            viewableBy: string | null;
                            intervale: string | null;
                        } | null;
                    }[];
                }[];
                images: {
                    date: string;
                    id: number;
                    name: string;
                    image: string;
                    createdAt: Date;
                    userId: string;
                }[];
                settings: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date | null;
                    userId: string;
                    isHiit: boolean | null;
                    isLiss: boolean | null;
                    defaultWater: string | null;
                    defaultChartRange: string | null;
                    isPosing: boolean | null;
                    isBloodGlucose: boolean | null;
                    isSleep: boolean | null;
                    isSleepQuality: boolean | null;
                    isNap: boolean | null;
                    isWeightTraining: boolean | null;
                    isNotes: boolean | null;
                    isSteps: boolean | null;
                    isSauna: boolean | null;
                    isColdPlunge: boolean | null;
                };
                supplementStacks: {
                    id: number;
                    name: string | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                    userId: string;
                    time: string | null;
                    isTemplate: boolean | null;
                    supplements: {
                        id: number;
                        supplementId: number;
                        supplementStackId: number;
                        size: string | null;
                        unit: string | null;
                        supplement: {
                            id: number;
                            name: string | null;
                            notes: string | null;
                            createdAt: Date;
                            updatedAt: Date | null;
                            userId: string | null;
                            favouriteAt: Date | null;
                            deletedAt: Date | null;
                            hiddenAt: Date | null;
                            isAusFood: boolean | null;
                            isAllStores: boolean | null;
                            serveSize: string | null;
                            serveUnit: string | null;
                            publicFoodKey: string | null;
                            classification: string | null;
                            foodName: string | null;
                            caloriesWFibre: string | null;
                            caloriesWOFibre: string | null;
                            protein: string | null;
                            fatTotal: string | null;
                            totalDietaryFibre: string | null;
                            totalSugars: string | null;
                            starch: string | null;
                            resistantStarch: string | null;
                            availableCarbohydrateWithoutSugarAlcohols: string | null;
                            availableCarbohydrateWithSugarAlcohols: string | null;
                            isUserCreated: boolean | null;
                            isSupplement: boolean | null;
                            isPrivate: boolean | null;
                            viewableBy: string | null;
                            intervale: string | null;
                        };
                    }[];
                }[];
            } | null | undefined;
            meta: object;
        }>;
        isUser: _trpc_server.TRPCQueryProcedure<{
            input: void;
            output: ({
                id: string;
                name: string;
                email: string;
                isTrainer: boolean;
                isCreator: boolean;
                isAdmin: boolean;
            } & next_auth.User) | null;
            meta: object;
        }>;
        isCreator: _trpc_server.TRPCQueryProcedure<{
            input: void;
            output: {
                isCreator: boolean | null;
            } | null | undefined;
            meta: object;
        }>;
        isTrainer: _trpc_server.TRPCQueryProcedure<{
            input: void;
            output: {
                isTrainer: boolean | null;
            } | null | undefined;
            meta: object;
        }>;
        isRoot: _trpc_server.TRPCQueryProcedure<{
            input: void;
            output: {
                isRoot: boolean | null;
            } | null | undefined;
            meta: object;
        }>;
        isAdmin: _trpc_server.TRPCQueryProcedure<{
            input: void;
            output: boolean | null;
            meta: object;
        }>;
    }>>;
    ingredient: _trpc_server.TRPCBuiltRouter<{
        ctx: {
            headers: Headers;
            db: drizzle_orm_libsql.LibSQLDatabase<typeof ______db_schema> & {
                $client: _libsql_client.Client;
            };
            session: next_auth.Session | null;
        };
        meta: object;
        errorShape: {
            data: {
                zodError: zod.ZodFlattenedError<unknown, string> | null;
                code: _trpc_server.TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: _trpc_server.TRPC_ERROR_CODE_NUMBER;
        };
        transformer: true;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        getAll: _trpc_server.TRPCQueryProcedure<{
            input: void;
            output: {
                id: number;
                name: string | null;
                notes: string | null;
                createdAt: Date;
                updatedAt: Date | null;
                userId: string | null;
                favouriteAt: Date | null;
                deletedAt: Date | null;
                hiddenAt: Date | null;
                isAusFood: boolean | null;
                isAllStores: boolean | null;
                serveSize: string | null;
                serveUnit: string | null;
                publicFoodKey: string | null;
                classification: string | null;
                foodName: string | null;
                caloriesWFibre: string | null;
                caloriesWOFibre: string | null;
                protein: string | null;
                fatTotal: string | null;
                totalDietaryFibre: string | null;
                totalSugars: string | null;
                starch: string | null;
                resistantStarch: string | null;
                availableCarbohydrateWithoutSugarAlcohols: string | null;
                availableCarbohydrateWithSugarAlcohols: string | null;
                isUserCreated: boolean | null;
                isSupplement: boolean | null;
                isPrivate: boolean | null;
                viewableBy: string | null;
                intervale: string | null;
                user: {
                    id: string;
                    name: string | null;
                } | null;
                ingredientToGroceryStore: {
                    id: number;
                    createdAt: Date;
                    ingredientId: number | null;
                    groceryStoreId: number | null;
                    groceryStore: {
                        id: number;
                        name: string | null;
                        createdAt: Date;
                        location: string | null;
                    } | null;
                }[];
            }[];
            meta: object;
        }>;
        getAllFav: _trpc_server.TRPCQueryProcedure<{
            input: void;
            output: {
                id: number;
                name: string | null;
                notes: string | null;
                createdAt: Date;
                updatedAt: Date | null;
                userId: string | null;
                favouriteAt: Date | null;
                deletedAt: Date | null;
                hiddenAt: Date | null;
                isAusFood: boolean | null;
                isAllStores: boolean | null;
                serveSize: string | null;
                serveUnit: string | null;
                publicFoodKey: string | null;
                classification: string | null;
                foodName: string | null;
                caloriesWFibre: string | null;
                caloriesWOFibre: string | null;
                protein: string | null;
                fatTotal: string | null;
                totalDietaryFibre: string | null;
                totalSugars: string | null;
                starch: string | null;
                resistantStarch: string | null;
                availableCarbohydrateWithoutSugarAlcohols: string | null;
                availableCarbohydrateWithSugarAlcohols: string | null;
                isUserCreated: boolean | null;
                isSupplement: boolean | null;
                isPrivate: boolean | null;
                viewableBy: string | null;
                intervale: string | null;
                ingredientToGroceryStore: {
                    id: number;
                    createdAt: Date;
                    ingredientId: number | null;
                    groceryStoreId: number | null;
                    groceryStore: {
                        id: number;
                        name: string | null;
                        createdAt: Date;
                        location: string | null;
                    } | null;
                }[];
            }[];
            meta: object;
        }>;
        get: _trpc_server.TRPCQueryProcedure<{
            input: {
                id: number;
            };
            output: {
                id: number;
                name: string | null;
                notes: string | null;
                createdAt: Date;
                updatedAt: Date | null;
                userId: string | null;
                favouriteAt: Date | null;
                deletedAt: Date | null;
                hiddenAt: Date | null;
                isAusFood: boolean | null;
                isAllStores: boolean | null;
                serveSize: string | null;
                serveUnit: string | null;
                publicFoodKey: string | null;
                classification: string | null;
                foodName: string | null;
                caloriesWFibre: string | null;
                caloriesWOFibre: string | null;
                protein: string | null;
                fatTotal: string | null;
                totalDietaryFibre: string | null;
                totalSugars: string | null;
                starch: string | null;
                resistantStarch: string | null;
                availableCarbohydrateWithoutSugarAlcohols: string | null;
                availableCarbohydrateWithSugarAlcohols: string | null;
                isUserCreated: boolean | null;
                isSupplement: boolean | null;
                isPrivate: boolean | null;
                viewableBy: string | null;
                intervale: string | null;
                user: {
                    id: string;
                    name: string | null;
                } | null;
                ingredientToGroceryStore: {
                    id: number;
                    createdAt: Date;
                    ingredientId: number | null;
                    groceryStoreId: number | null;
                    groceryStore: {
                        id: number;
                        name: string | null;
                        createdAt: Date;
                        location: string | null;
                    } | null;
                }[];
            } | undefined;
            meta: object;
        }>;
        updateHiddenAt: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        deleteHiddenAt: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        updateFavourite: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        deleteFavourite: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        update: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
                name: string;
                serveSize: string;
                serveUnit: string;
                caloriesWFibre: string;
                caloriesWOFibre: string;
                protein: string;
                fatTotal: string;
                totalDietaryFibre: string;
                totalSugars: string;
                starch: string;
                resistantStarch: string;
                availableCarbohydrateWithoutSugarAlcohols: string;
                availableCarbohydrateWithSugarAlcohols: string;
                isAllStores: boolean;
                stores: string[];
            };
            output: {
                id: number;
            }[];
            meta: object;
        }>;
        create: _trpc_server.TRPCMutationProcedure<{
            input: {
                name: string;
                serveSize: string;
                serveUnit: string;
                caloriesWFibre: string;
                caloriesWOFibre: string;
                protein: string;
                fatTotal: string;
                totalDietaryFibre: string;
                totalSugars: string;
                starch: string;
                resistantStarch: string;
                availableCarbohydrateWithoutSugarAlcohols: string;
                availableCarbohydrateWithSugarAlcohols: string;
                isAllStores: boolean;
                stores: string[];
            };
            output: {
                id: number;
                name: string | null;
                serveSize: string | null;
                serveUnit: string | null;
                caloriesWFibre: string | null;
            }[];
            meta: object;
        }>;
        delete: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
    }>>;
    test: _trpc_server.TRPCBuiltRouter<{
        ctx: {
            headers: Headers;
            db: drizzle_orm_libsql.LibSQLDatabase<typeof ______db_schema> & {
                $client: _libsql_client.Client;
            };
            session: next_auth.Session | null;
        };
        meta: object;
        errorShape: {
            data: {
                zodError: zod.ZodFlattenedError<unknown, string> | null;
                code: _trpc_server.TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: _trpc_server.TRPC_ERROR_CODE_NUMBER;
        };
        transformer: true;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        createDBMap: _trpc_server.TRPCMutationProcedure<{
            input: void;
            output: boolean;
            meta: object;
        }>;
        generateGroceryStores: _trpc_server.TRPCMutationProcedure<{
            input: void;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        deleteAllIngredients: _trpc_server.TRPCMutationProcedure<{
            input: void;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        importAFCDLiquid: _trpc_server.TRPCMutationProcedure<{
            input: void;
            output: {
                id: number;
                publicFoodKey: string | null;
            }[];
            meta: object;
        }>;
        importAFCDSolid: _trpc_server.TRPCMutationProcedure<{
            input: void;
            output: {
                id: number;
                publicFoodKey: string | null;
            }[];
            meta: object;
        }>;
    }>>;
    groceryStore: _trpc_server.TRPCBuiltRouter<{
        ctx: {
            headers: Headers;
            db: drizzle_orm_libsql.LibSQLDatabase<typeof ______db_schema> & {
                $client: _libsql_client.Client;
            };
            session: next_auth.Session | null;
        };
        meta: object;
        errorShape: {
            data: {
                zodError: zod.ZodFlattenedError<unknown, string> | null;
                code: _trpc_server.TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: _trpc_server.TRPC_ERROR_CODE_NUMBER;
        };
        transformer: true;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        getAll: _trpc_server.TRPCQueryProcedure<{
            input: void;
            output: {
                id: number;
                name: string | null;
                createdAt: Date;
                location: string | null;
            }[];
            meta: object;
        }>;
        get: _trpc_server.TRPCQueryProcedure<{
            input: {
                id: number;
            };
            output: {
                id: number;
                name: string | null;
                createdAt: Date;
                location: string | null;
            } | undefined;
            meta: object;
        }>;
        create: _trpc_server.TRPCMutationProcedure<{
            input: {
                name: string;
                location: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        delete: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
    }>>;
    settings: _trpc_server.TRPCBuiltRouter<{
        ctx: {
            headers: Headers;
            db: drizzle_orm_libsql.LibSQLDatabase<typeof ______db_schema> & {
                $client: _libsql_client.Client;
            };
            session: next_auth.Session | null;
        };
        meta: object;
        errorShape: {
            data: {
                zodError: zod.ZodFlattenedError<unknown, string> | null;
                code: _trpc_server.TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: _trpc_server.TRPC_ERROR_CODE_NUMBER;
        };
        transformer: true;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        get: _trpc_server.TRPCQueryProcedure<{
            input: void;
            output: {
                id: number;
                isCaloriesWithFibre: boolean | null;
            } | undefined;
            meta: object;
        }>;
        updateCalories: _trpc_server.TRPCMutationProcedure<{
            input: boolean;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
    }>>;
    recipe: _trpc_server.TRPCBuiltRouter<{
        ctx: {
            headers: Headers;
            db: drizzle_orm_libsql.LibSQLDatabase<typeof ______db_schema> & {
                $client: _libsql_client.Client;
            };
            session: next_auth.Session | null;
        };
        meta: object;
        errorShape: {
            data: {
                zodError: zod.ZodFlattenedError<unknown, string> | null;
                code: _trpc_server.TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: _trpc_server.TRPC_ERROR_CODE_NUMBER;
        };
        transformer: true;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        getAll: _trpc_server.TRPCQueryProcedure<{
            input: void;
            output: {
                id: number;
                name: string;
                notes: string;
                image: string;
                createdAt: Date;
                updatedAt: Date | null;
                description: string;
                creatorId: string;
                favouriteAt: Date | null;
                deletedAt: Date | null;
                hiddenAt: Date | null;
                calories: number;
                isUserRecipe: boolean | null;
                isGlobal: boolean | null;
                recipeCategory: string;
                creator: {
                    id: string;
                    name: string | null;
                    firstName: string | null;
                    lastName: string | null;
                    clerkId: string | null;
                    birthDate: Date | null;
                    gender: string | null;
                    address: string | null;
                    notes: string | null;
                    instagram: string | null;
                    openLifter: string | null;
                    phone: string | null;
                    email: string | null;
                    emailVerified: Date | null;
                    password: string | null;
                    currentPlanId: number | null;
                    image: string | null;
                    isFake: boolean | null;
                    isTrainer: boolean | null;
                    isRoot: boolean | null;
                    isCreator: boolean | null;
                    isAllTrainers: boolean | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                };
                recipeToIngredient: {
                    id: number;
                    createdAt: Date;
                    serveSize: string;
                    serveUnit: string;
                    isUserCreated: boolean | null;
                    ingredientId: number;
                    recipeId: number;
                    index: number;
                    alternateId: number | null;
                    note: string | null;
                    ingredient: {
                        id: number;
                        name: string | null;
                        notes: string | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                        userId: string | null;
                        favouriteAt: Date | null;
                        deletedAt: Date | null;
                        hiddenAt: Date | null;
                        isAusFood: boolean | null;
                        isAllStores: boolean | null;
                        serveSize: string | null;
                        serveUnit: string | null;
                        publicFoodKey: string | null;
                        classification: string | null;
                        foodName: string | null;
                        caloriesWFibre: string | null;
                        caloriesWOFibre: string | null;
                        protein: string | null;
                        fatTotal: string | null;
                        totalDietaryFibre: string | null;
                        totalSugars: string | null;
                        starch: string | null;
                        resistantStarch: string | null;
                        availableCarbohydrateWithoutSugarAlcohols: string | null;
                        availableCarbohydrateWithSugarAlcohols: string | null;
                        isUserCreated: boolean | null;
                        isSupplement: boolean | null;
                        isPrivate: boolean | null;
                        viewableBy: string | null;
                        intervale: string | null;
                        ingredientToGroceryStore: {
                            id: number;
                            createdAt: Date;
                            ingredientId: number | null;
                            groceryStoreId: number | null;
                            groceryStore: {
                                id: number;
                                name: string | null;
                                createdAt: Date;
                                location: string | null;
                            } | null;
                        }[];
                    };
                    alternateIngredient: {
                        id: number;
                        name: string | null;
                        notes: string | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                        userId: string | null;
                        favouriteAt: Date | null;
                        deletedAt: Date | null;
                        hiddenAt: Date | null;
                        isAusFood: boolean | null;
                        isAllStores: boolean | null;
                        serveSize: string | null;
                        serveUnit: string | null;
                        publicFoodKey: string | null;
                        classification: string | null;
                        foodName: string | null;
                        caloriesWFibre: string | null;
                        caloriesWOFibre: string | null;
                        protein: string | null;
                        fatTotal: string | null;
                        totalDietaryFibre: string | null;
                        totalSugars: string | null;
                        starch: string | null;
                        resistantStarch: string | null;
                        availableCarbohydrateWithoutSugarAlcohols: string | null;
                        availableCarbohydrateWithSugarAlcohols: string | null;
                        isUserCreated: boolean | null;
                        isSupplement: boolean | null;
                        isPrivate: boolean | null;
                        viewableBy: string | null;
                        intervale: string | null;
                    } | null;
                }[];
            }[];
            meta: object;
        }>;
        getAllUserCreated: _trpc_server.TRPCQueryProcedure<{
            input: {
                userId: string;
            };
            output: {
                id: number;
                name: string;
                notes: string;
                image: string;
                createdAt: Date;
                updatedAt: Date | null;
                description: string;
                creatorId: string;
                favouriteAt: Date | null;
                deletedAt: Date | null;
                hiddenAt: Date | null;
                calories: number;
                isUserRecipe: boolean | null;
                isGlobal: boolean | null;
                recipeCategory: string;
                creator: {
                    id: string;
                    name: string | null;
                    firstName: string | null;
                    lastName: string | null;
                    clerkId: string | null;
                    birthDate: Date | null;
                    gender: string | null;
                    address: string | null;
                    notes: string | null;
                    instagram: string | null;
                    openLifter: string | null;
                    phone: string | null;
                    email: string | null;
                    emailVerified: Date | null;
                    password: string | null;
                    currentPlanId: number | null;
                    image: string | null;
                    isFake: boolean | null;
                    isTrainer: boolean | null;
                    isRoot: boolean | null;
                    isCreator: boolean | null;
                    isAllTrainers: boolean | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                };
                recipeToIngredient: {
                    id: number;
                    createdAt: Date;
                    serveSize: string;
                    serveUnit: string;
                    isUserCreated: boolean | null;
                    ingredientId: number;
                    recipeId: number;
                    index: number;
                    alternateId: number | null;
                    note: string | null;
                    ingredient: {
                        id: number;
                        name: string | null;
                        notes: string | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                        userId: string | null;
                        favouriteAt: Date | null;
                        deletedAt: Date | null;
                        hiddenAt: Date | null;
                        isAusFood: boolean | null;
                        isAllStores: boolean | null;
                        serveSize: string | null;
                        serveUnit: string | null;
                        publicFoodKey: string | null;
                        classification: string | null;
                        foodName: string | null;
                        caloriesWFibre: string | null;
                        caloriesWOFibre: string | null;
                        protein: string | null;
                        fatTotal: string | null;
                        totalDietaryFibre: string | null;
                        totalSugars: string | null;
                        starch: string | null;
                        resistantStarch: string | null;
                        availableCarbohydrateWithoutSugarAlcohols: string | null;
                        availableCarbohydrateWithSugarAlcohols: string | null;
                        isUserCreated: boolean | null;
                        isSupplement: boolean | null;
                        isPrivate: boolean | null;
                        viewableBy: string | null;
                        intervale: string | null;
                        ingredientToGroceryStore: {
                            id: number;
                            createdAt: Date;
                            ingredientId: number | null;
                            groceryStoreId: number | null;
                            groceryStore: {
                                id: number;
                                name: string | null;
                                createdAt: Date;
                                location: string | null;
                            } | null;
                        }[];
                    };
                }[];
            }[];
            meta: object;
        }>;
        get: _trpc_server.TRPCQueryProcedure<{
            input: {
                id: number;
            };
            output: {
                id: number;
                name: string;
                notes: string;
                image: string;
                createdAt: Date;
                updatedAt: Date | null;
                description: string;
                creatorId: string;
                favouriteAt: Date | null;
                deletedAt: Date | null;
                hiddenAt: Date | null;
                calories: number;
                isUserRecipe: boolean | null;
                isGlobal: boolean | null;
                recipeCategory: string;
                creator: {
                    id: string;
                    name: string | null;
                    firstName: string | null;
                    lastName: string | null;
                    clerkId: string | null;
                    birthDate: Date | null;
                    gender: string | null;
                    address: string | null;
                    notes: string | null;
                    instagram: string | null;
                    openLifter: string | null;
                    phone: string | null;
                    email: string | null;
                    emailVerified: Date | null;
                    password: string | null;
                    currentPlanId: number | null;
                    image: string | null;
                    isFake: boolean | null;
                    isTrainer: boolean | null;
                    isRoot: boolean | null;
                    isCreator: boolean | null;
                    isAllTrainers: boolean | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                };
                recipeToIngredient: {
                    id: number;
                    createdAt: Date;
                    serveSize: string;
                    serveUnit: string;
                    isUserCreated: boolean | null;
                    ingredientId: number;
                    recipeId: number;
                    index: number;
                    alternateId: number | null;
                    note: string | null;
                    ingredient: {
                        id: number;
                        name: string | null;
                        notes: string | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                        userId: string | null;
                        favouriteAt: Date | null;
                        deletedAt: Date | null;
                        hiddenAt: Date | null;
                        isAusFood: boolean | null;
                        isAllStores: boolean | null;
                        serveSize: string | null;
                        serveUnit: string | null;
                        publicFoodKey: string | null;
                        classification: string | null;
                        foodName: string | null;
                        caloriesWFibre: string | null;
                        caloriesWOFibre: string | null;
                        protein: string | null;
                        fatTotal: string | null;
                        totalDietaryFibre: string | null;
                        totalSugars: string | null;
                        starch: string | null;
                        resistantStarch: string | null;
                        availableCarbohydrateWithoutSugarAlcohols: string | null;
                        availableCarbohydrateWithSugarAlcohols: string | null;
                        isUserCreated: boolean | null;
                        isSupplement: boolean | null;
                        isPrivate: boolean | null;
                        viewableBy: string | null;
                        intervale: string | null;
                        ingredientToGroceryStore: {
                            id: number;
                            createdAt: Date;
                            ingredientId: number | null;
                            groceryStoreId: number | null;
                            groceryStore: {
                                id: number;
                                name: string | null;
                                createdAt: Date;
                                location: string | null;
                            } | null;
                        }[];
                    };
                }[];
            } | undefined;
            meta: object;
        }>;
        update: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
                name: string;
                description: string;
                image: string;
                notes: string;
                recipeCategory: string;
                calories: number;
                ingredients: {
                    ingredientId: number;
                    alternateId: string;
                    note: string;
                    serveSize: string;
                    serveUnit: string;
                    index: number;
                    isAlternate?: boolean | undefined;
                }[];
                isUserRecipe?: boolean | undefined;
            };
            output: {
                id: number;
            }[] | {
                res: {
                    id: number;
                }[];
                ingredientsRes: {
                    id: number;
                }[];
            };
            meta: object;
        }>;
        duplicate: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: {
                id: number;
            }[] | {
                res: {
                    id: number;
                }[];
                ingredientsRes: {
                    id: number;
                }[];
            } | undefined;
            meta: object;
        }>;
        create: _trpc_server.TRPCMutationProcedure<{
            input: {
                name: string;
                description: string;
                image: string;
                notes: string;
                recipeCategory: string;
                calories: number;
                ingredients: {
                    ingredientId: number;
                    alternateId: string;
                    note: string;
                    serveSize: string;
                    serveUnit: string;
                    index: number;
                }[];
                isUserRecipe?: boolean | undefined;
            };
            output: {
                id: number;
            }[] | {
                res: {
                    id: number;
                }[];
                ingredientsRes: {
                    id: number;
                }[];
            };
            meta: object;
        }>;
        delete: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        deleteAll: _trpc_server.TRPCMutationProcedure<{
            input: void;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
    }>>;
    plan: _trpc_server.TRPCBuiltRouter<{
        ctx: {
            headers: Headers;
            db: drizzle_orm_libsql.LibSQLDatabase<typeof ______db_schema> & {
                $client: _libsql_client.Client;
            };
            session: next_auth.Session | null;
        };
        meta: object;
        errorShape: {
            data: {
                zodError: zod.ZodFlattenedError<unknown, string> | null;
                code: _trpc_server.TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: _trpc_server.TRPC_ERROR_CODE_NUMBER;
        };
        transformer: true;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        getAllSimple: _trpc_server.TRPCQueryProcedure<{
            input: void;
            output: {
                id: number;
                name: string | null;
                notes: string | null;
                image: string | null;
                createdAt: Date;
                updatedAt: Date | null;
                description: string | null;
                numberOfMeals: number | null;
                creatorId: string | null;
                favouriteAt: Date | null;
                deletedAt: Date | null;
                hiddenAt: Date | null;
                isGlobal: boolean | null;
                planCategory: string | null;
                creator: {
                    id: string;
                    name: string | null;
                    firstName: string | null;
                    lastName: string | null;
                    clerkId: string | null;
                    birthDate: Date | null;
                    gender: string | null;
                    address: string | null;
                    notes: string | null;
                    instagram: string | null;
                    openLifter: string | null;
                    phone: string | null;
                    email: string | null;
                    emailVerified: Date | null;
                    password: string | null;
                    currentPlanId: number | null;
                    image: string | null;
                    isFake: boolean | null;
                    isTrainer: boolean | null;
                    isRoot: boolean | null;
                    isCreator: boolean | null;
                    isAllTrainers: boolean | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                } | null;
            }[];
            meta: object;
        }>;
        getAll: _trpc_server.TRPCQueryProcedure<{
            input: void;
            output: {
                id: number;
                name: string | null;
                notes: string | null;
                image: string | null;
                createdAt: Date;
                updatedAt: Date | null;
                description: string | null;
                numberOfMeals: number | null;
                creatorId: string | null;
                favouriteAt: Date | null;
                deletedAt: Date | null;
                hiddenAt: Date | null;
                isGlobal: boolean | null;
                planCategory: string | null;
                creator: {
                    id: string;
                    name: string | null;
                    firstName: string | null;
                    lastName: string | null;
                    clerkId: string | null;
                    birthDate: Date | null;
                    gender: string | null;
                    address: string | null;
                    notes: string | null;
                    instagram: string | null;
                    openLifter: string | null;
                    phone: string | null;
                    email: string | null;
                    emailVerified: Date | null;
                    password: string | null;
                    currentPlanId: number | null;
                    image: string | null;
                    isFake: boolean | null;
                    isTrainer: boolean | null;
                    isRoot: boolean | null;
                    isCreator: boolean | null;
                    isAllTrainers: boolean | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                } | null;
                meals: {
                    id: number;
                    name: string | null;
                    notes: string | null;
                    image: string | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                    description: string | null;
                    creatorId: string | null;
                    favouriteAt: Date | null;
                    deletedAt: Date | null;
                    hiddenAt: Date | null;
                    calories: string | null;
                    mealIndex: number | null;
                    vegeCalories: string | null;
                    planId: number | null;
                    mealCategory: string | null;
                    vegeNotes: string | null;
                    vege: string | null;
                    mealToRecipe: {
                        id: number;
                        createdAt: Date;
                        recipeId: number | null;
                        index: number;
                        note: string | null;
                        mealId: number | null;
                        recipe: {
                            id: number;
                            name: string;
                            notes: string;
                            image: string;
                            createdAt: Date;
                            updatedAt: Date | null;
                            description: string;
                            creatorId: string;
                            favouriteAt: Date | null;
                            deletedAt: Date | null;
                            hiddenAt: Date | null;
                            calories: number;
                            isUserRecipe: boolean | null;
                            isGlobal: boolean | null;
                            recipeCategory: string;
                            recipeToIngredient: {
                                id: number;
                                createdAt: Date;
                                serveSize: string;
                                serveUnit: string;
                                isUserCreated: boolean | null;
                                ingredientId: number;
                                recipeId: number;
                                index: number;
                                alternateId: number | null;
                                note: string | null;
                                ingredient: {
                                    id: number;
                                    name: string | null;
                                    notes: string | null;
                                    createdAt: Date;
                                    updatedAt: Date | null;
                                    userId: string | null;
                                    favouriteAt: Date | null;
                                    deletedAt: Date | null;
                                    hiddenAt: Date | null;
                                    isAusFood: boolean | null;
                                    isAllStores: boolean | null;
                                    serveSize: string | null;
                                    serveUnit: string | null;
                                    publicFoodKey: string | null;
                                    classification: string | null;
                                    foodName: string | null;
                                    caloriesWFibre: string | null;
                                    caloriesWOFibre: string | null;
                                    protein: string | null;
                                    fatTotal: string | null;
                                    totalDietaryFibre: string | null;
                                    totalSugars: string | null;
                                    starch: string | null;
                                    resistantStarch: string | null;
                                    availableCarbohydrateWithoutSugarAlcohols: string | null;
                                    availableCarbohydrateWithSugarAlcohols: string | null;
                                    isUserCreated: boolean | null;
                                    isSupplement: boolean | null;
                                    isPrivate: boolean | null;
                                    viewableBy: string | null;
                                    intervale: string | null;
                                };
                                alternateIngredient: {
                                    id: number;
                                    name: string | null;
                                    notes: string | null;
                                    createdAt: Date;
                                    updatedAt: Date | null;
                                    userId: string | null;
                                    favouriteAt: Date | null;
                                    deletedAt: Date | null;
                                    hiddenAt: Date | null;
                                    isAusFood: boolean | null;
                                    isAllStores: boolean | null;
                                    serveSize: string | null;
                                    serveUnit: string | null;
                                    publicFoodKey: string | null;
                                    classification: string | null;
                                    foodName: string | null;
                                    caloriesWFibre: string | null;
                                    caloriesWOFibre: string | null;
                                    protein: string | null;
                                    fatTotal: string | null;
                                    totalDietaryFibre: string | null;
                                    totalSugars: string | null;
                                    starch: string | null;
                                    resistantStarch: string | null;
                                    availableCarbohydrateWithoutSugarAlcohols: string | null;
                                    availableCarbohydrateWithSugarAlcohols: string | null;
                                    isUserCreated: boolean | null;
                                    isSupplement: boolean | null;
                                    isPrivate: boolean | null;
                                    viewableBy: string | null;
                                    intervale: string | null;
                                } | null;
                            }[];
                        } | null;
                    }[];
                    mealToVegeStack: {
                        id: number;
                        createdAt: Date;
                        calories: string | null;
                        note: string | null;
                        mealId: number | null;
                        vegeStackId: number | null;
                        vegeStack: {
                            id: number;
                            name: string | null;
                            notes: string | null;
                            createdAt: Date;
                            updatedAt: Date | null;
                            calories: string | null;
                            veges: string | null;
                        } | null;
                    }[];
                }[];
            }[];
            meta: object;
        }>;
        get: _trpc_server.TRPCQueryProcedure<{
            input: number;
            output: {
                id: number;
                name: string | null;
                notes: string | null;
                image: string | null;
                createdAt: Date;
                updatedAt: Date | null;
                description: string | null;
                numberOfMeals: number | null;
                creatorId: string | null;
                favouriteAt: Date | null;
                deletedAt: Date | null;
                hiddenAt: Date | null;
                isGlobal: boolean | null;
                planCategory: string | null;
                creator: {
                    id: string;
                    name: string | null;
                    firstName: string | null;
                    lastName: string | null;
                    clerkId: string | null;
                    birthDate: Date | null;
                    gender: string | null;
                    address: string | null;
                    notes: string | null;
                    instagram: string | null;
                    openLifter: string | null;
                    phone: string | null;
                    email: string | null;
                    emailVerified: Date | null;
                    password: string | null;
                    currentPlanId: number | null;
                    image: string | null;
                    isFake: boolean | null;
                    isTrainer: boolean | null;
                    isRoot: boolean | null;
                    isCreator: boolean | null;
                    isAllTrainers: boolean | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                } | null;
                meals: {
                    id: number;
                    name: string | null;
                    notes: string | null;
                    image: string | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                    description: string | null;
                    creatorId: string | null;
                    favouriteAt: Date | null;
                    deletedAt: Date | null;
                    hiddenAt: Date | null;
                    calories: string | null;
                    mealIndex: number | null;
                    vegeCalories: string | null;
                    planId: number | null;
                    mealCategory: string | null;
                    vegeNotes: string | null;
                    vege: string | null;
                    mealToRecipe: {
                        id: number;
                        createdAt: Date;
                        recipeId: number | null;
                        index: number;
                        note: string | null;
                        mealId: number | null;
                        recipe: {
                            id: number;
                            name: string;
                            notes: string;
                            image: string;
                            createdAt: Date;
                            updatedAt: Date | null;
                            description: string;
                            creatorId: string;
                            favouriteAt: Date | null;
                            deletedAt: Date | null;
                            hiddenAt: Date | null;
                            calories: number;
                            isUserRecipe: boolean | null;
                            isGlobal: boolean | null;
                            recipeCategory: string;
                            recipeToIngredient: {
                                id: number;
                                createdAt: Date;
                                serveSize: string;
                                serveUnit: string;
                                isUserCreated: boolean | null;
                                ingredientId: number;
                                recipeId: number;
                                index: number;
                                alternateId: number | null;
                                note: string | null;
                                ingredient: {
                                    id: number;
                                    name: string | null;
                                    notes: string | null;
                                    createdAt: Date;
                                    updatedAt: Date | null;
                                    userId: string | null;
                                    favouriteAt: Date | null;
                                    deletedAt: Date | null;
                                    hiddenAt: Date | null;
                                    isAusFood: boolean | null;
                                    isAllStores: boolean | null;
                                    serveSize: string | null;
                                    serveUnit: string | null;
                                    publicFoodKey: string | null;
                                    classification: string | null;
                                    foodName: string | null;
                                    caloriesWFibre: string | null;
                                    caloriesWOFibre: string | null;
                                    protein: string | null;
                                    fatTotal: string | null;
                                    totalDietaryFibre: string | null;
                                    totalSugars: string | null;
                                    starch: string | null;
                                    resistantStarch: string | null;
                                    availableCarbohydrateWithoutSugarAlcohols: string | null;
                                    availableCarbohydrateWithSugarAlcohols: string | null;
                                    isUserCreated: boolean | null;
                                    isSupplement: boolean | null;
                                    isPrivate: boolean | null;
                                    viewableBy: string | null;
                                    intervale: string | null;
                                    ingredientToGroceryStore: {
                                        id: number;
                                        createdAt: Date;
                                        ingredientId: number | null;
                                        groceryStoreId: number | null;
                                        groceryStore: {
                                            id: number;
                                            name: string | null;
                                            createdAt: Date;
                                            location: string | null;
                                        } | null;
                                    }[];
                                };
                                alternateIngredient: {
                                    id: number;
                                    name: string | null;
                                    notes: string | null;
                                    createdAt: Date;
                                    updatedAt: Date | null;
                                    userId: string | null;
                                    favouriteAt: Date | null;
                                    deletedAt: Date | null;
                                    hiddenAt: Date | null;
                                    isAusFood: boolean | null;
                                    isAllStores: boolean | null;
                                    serveSize: string | null;
                                    serveUnit: string | null;
                                    publicFoodKey: string | null;
                                    classification: string | null;
                                    foodName: string | null;
                                    caloriesWFibre: string | null;
                                    caloriesWOFibre: string | null;
                                    protein: string | null;
                                    fatTotal: string | null;
                                    totalDietaryFibre: string | null;
                                    totalSugars: string | null;
                                    starch: string | null;
                                    resistantStarch: string | null;
                                    availableCarbohydrateWithoutSugarAlcohols: string | null;
                                    availableCarbohydrateWithSugarAlcohols: string | null;
                                    isUserCreated: boolean | null;
                                    isSupplement: boolean | null;
                                    isPrivate: boolean | null;
                                    viewableBy: string | null;
                                    intervale: string | null;
                                } | null;
                            }[];
                        } | null;
                    }[];
                    mealToVegeStack: {
                        id: number;
                        createdAt: Date;
                        calories: string | null;
                        note: string | null;
                        mealId: number | null;
                        vegeStackId: number | null;
                        vegeStack: {
                            id: number;
                            name: string | null;
                            notes: string | null;
                            createdAt: Date;
                            updatedAt: Date | null;
                            calories: string | null;
                            veges: string | null;
                        } | null;
                    }[];
                }[];
            } | undefined;
            meta: object;
        }>;
        update: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
                name: string;
                description: string;
                image: string;
                notes: string;
                planCategory: string;
                numberOfMeals: number;
                meals: {
                    mealIndex: number;
                    mealTitle: string;
                    calories: string;
                    vegeCalories: string;
                    vegeNotes: string;
                    vege: string;
                    note: string;
                    recipes: {
                        recipeId: number;
                        note: string;
                    }[];
                }[];
            };
            output: {
                id: number;
            }[] | {
                res: {
                    id: number;
                }[];
            };
            meta: object;
        }>;
        saveAsPlan: _trpc_server.TRPCMutationProcedure<{
            input: {
                name: string;
                description: string;
                image: string;
                notes: string;
                planCategory: string;
                numberOfMeals: number;
                meals: {
                    mealIndex: number;
                    mealTitle: string;
                    calories: string;
                    vegeCalories: string;
                    vegeNotes: string;
                    vege: string;
                    note: string;
                    recipes: {
                        id: number;
                        note: string;
                        name: string;
                        calories: string;
                        ingredients: {
                            ingredientId: number;
                            alternateId: number | null;
                            name: string;
                            serve: string;
                            serveUnit: string;
                            note: string;
                        }[];
                    }[];
                }[];
            };
            output: {
                id: number;
            }[] | {
                res: {
                    id: number;
                }[];
            };
            meta: object;
        }>;
        create: _trpc_server.TRPCMutationProcedure<{
            input: {
                name: string;
                description: string;
                image: string;
                notes: string;
                planCategory: string;
                numberOfMeals: number;
                meals: {
                    mealIndex: number;
                    mealTitle: string;
                    calories: string;
                    vegeCalories: string;
                    vegeNotes: string;
                    vege: string;
                    note: string;
                    recipes: {
                        recipeId: number;
                        note: string;
                    }[];
                }[];
            };
            output: {
                id: number;
            }[] | {
                res: {
                    id: number;
                }[];
            };
            meta: object;
        }>;
        delete: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        deleteAll: _trpc_server.TRPCMutationProcedure<{
            input: void;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
    }>>;
    vege: _trpc_server.TRPCBuiltRouter<{
        ctx: {
            headers: Headers;
            db: drizzle_orm_libsql.LibSQLDatabase<typeof ______db_schema> & {
                $client: _libsql_client.Client;
            };
            session: next_auth.Session | null;
        };
        meta: object;
        errorShape: {
            data: {
                zodError: zod.ZodFlattenedError<unknown, string> | null;
                code: _trpc_server.TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: _trpc_server.TRPC_ERROR_CODE_NUMBER;
        };
        transformer: true;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        getAll: _trpc_server.TRPCQueryProcedure<{
            input: void;
            output: {
                id: number;
                name: string | null;
                notes: string | null;
                createdAt: Date;
                updatedAt: Date | null;
                calories: string | null;
                veges: string | null;
            }[];
            meta: object;
        }>;
        get: _trpc_server.TRPCQueryProcedure<{
            input: {
                id: number;
            };
            output: {
                id: number;
                name: string | null;
                notes: string | null;
                createdAt: Date;
                updatedAt: Date | null;
                calories: string | null;
                veges: string | null;
            } | undefined;
            meta: object;
        }>;
        create: _trpc_server.TRPCMutationProcedure<{
            input: {
                veges: string;
                notes: string;
                calories: string;
                name: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        delete: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        deleteAll: _trpc_server.TRPCMutationProcedure<{
            input: void;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
    }>>;
    meal: _trpc_server.TRPCBuiltRouter<{
        ctx: {
            headers: Headers;
            db: drizzle_orm_libsql.LibSQLDatabase<typeof ______db_schema> & {
                $client: _libsql_client.Client;
            };
            session: next_auth.Session | null;
        };
        meta: object;
        errorShape: {
            data: {
                zodError: zod.ZodFlattenedError<unknown, string> | null;
                code: _trpc_server.TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: _trpc_server.TRPC_ERROR_CODE_NUMBER;
        };
        transformer: true;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        getAll: _trpc_server.TRPCQueryProcedure<{
            input: void;
            output: {
                id: number;
                name: string | null;
                notes: string | null;
                image: string | null;
                createdAt: Date;
                updatedAt: Date | null;
                description: string | null;
                creatorId: string | null;
                favouriteAt: Date | null;
                deletedAt: Date | null;
                hiddenAt: Date | null;
                calories: string | null;
                mealIndex: number | null;
                vegeCalories: string | null;
                planId: number | null;
                mealCategory: string | null;
                vegeNotes: string | null;
                vege: string | null;
                mealToRecipe: {
                    id: number;
                    createdAt: Date;
                    recipeId: number | null;
                    index: number;
                    note: string | null;
                    mealId: number | null;
                    recipe: {
                        id: number;
                        name: string;
                        notes: string;
                        image: string;
                        createdAt: Date;
                        updatedAt: Date | null;
                        description: string;
                        creatorId: string;
                        favouriteAt: Date | null;
                        deletedAt: Date | null;
                        hiddenAt: Date | null;
                        calories: number;
                        isUserRecipe: boolean | null;
                        isGlobal: boolean | null;
                        recipeCategory: string;
                        recipeToIngredient: {
                            id: number;
                            createdAt: Date;
                            serveSize: string;
                            serveUnit: string;
                            isUserCreated: boolean | null;
                            ingredientId: number;
                            recipeId: number;
                            index: number;
                            alternateId: number | null;
                            note: string | null;
                            ingredient: {
                                id: number;
                                name: string | null;
                                notes: string | null;
                                createdAt: Date;
                                updatedAt: Date | null;
                                userId: string | null;
                                favouriteAt: Date | null;
                                deletedAt: Date | null;
                                hiddenAt: Date | null;
                                isAusFood: boolean | null;
                                isAllStores: boolean | null;
                                serveSize: string | null;
                                serveUnit: string | null;
                                publicFoodKey: string | null;
                                classification: string | null;
                                foodName: string | null;
                                caloriesWFibre: string | null;
                                caloriesWOFibre: string | null;
                                protein: string | null;
                                fatTotal: string | null;
                                totalDietaryFibre: string | null;
                                totalSugars: string | null;
                                starch: string | null;
                                resistantStarch: string | null;
                                availableCarbohydrateWithoutSugarAlcohols: string | null;
                                availableCarbohydrateWithSugarAlcohols: string | null;
                                isUserCreated: boolean | null;
                                isSupplement: boolean | null;
                                isPrivate: boolean | null;
                                viewableBy: string | null;
                                intervale: string | null;
                                ingredientToGroceryStore: {
                                    id: number;
                                    createdAt: Date;
                                    ingredientId: number | null;
                                    groceryStoreId: number | null;
                                    groceryStore: {
                                        id: number;
                                        name: string | null;
                                        createdAt: Date;
                                        location: string | null;
                                    } | null;
                                }[];
                            };
                        }[];
                    } | null;
                }[];
                mealToVegeStack: {
                    id: number;
                    createdAt: Date;
                    calories: string | null;
                    note: string | null;
                    mealId: number | null;
                    vegeStackId: number | null;
                    vegeStack: {
                        id: number;
                        name: string | null;
                        notes: string | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                        calories: string | null;
                        veges: string | null;
                    } | null;
                }[];
            }[];
            meta: object;
        }>;
        get: _trpc_server.TRPCQueryProcedure<{
            input: {
                id: number;
            };
            output: {
                id: number;
                name: string | null;
                notes: string | null;
                image: string | null;
                createdAt: Date;
                updatedAt: Date | null;
                description: string | null;
                creatorId: string | null;
                favouriteAt: Date | null;
                deletedAt: Date | null;
                hiddenAt: Date | null;
                calories: string | null;
                mealIndex: number | null;
                vegeCalories: string | null;
                planId: number | null;
                mealCategory: string | null;
                vegeNotes: string | null;
                vege: string | null;
                mealToRecipe: {
                    id: number;
                    createdAt: Date;
                    recipeId: number | null;
                    index: number;
                    note: string | null;
                    mealId: number | null;
                    recipe: {
                        id: number;
                        name: string;
                        notes: string;
                        image: string;
                        createdAt: Date;
                        updatedAt: Date | null;
                        description: string;
                        creatorId: string;
                        favouriteAt: Date | null;
                        deletedAt: Date | null;
                        hiddenAt: Date | null;
                        calories: number;
                        isUserRecipe: boolean | null;
                        isGlobal: boolean | null;
                        recipeCategory: string;
                        recipeToIngredient: {
                            id: number;
                            createdAt: Date;
                            serveSize: string;
                            serveUnit: string;
                            isUserCreated: boolean | null;
                            ingredientId: number;
                            recipeId: number;
                            index: number;
                            alternateId: number | null;
                            note: string | null;
                            ingredient: {
                                id: number;
                                name: string | null;
                                notes: string | null;
                                createdAt: Date;
                                updatedAt: Date | null;
                                userId: string | null;
                                favouriteAt: Date | null;
                                deletedAt: Date | null;
                                hiddenAt: Date | null;
                                isAusFood: boolean | null;
                                isAllStores: boolean | null;
                                serveSize: string | null;
                                serveUnit: string | null;
                                publicFoodKey: string | null;
                                classification: string | null;
                                foodName: string | null;
                                caloriesWFibre: string | null;
                                caloriesWOFibre: string | null;
                                protein: string | null;
                                fatTotal: string | null;
                                totalDietaryFibre: string | null;
                                totalSugars: string | null;
                                starch: string | null;
                                resistantStarch: string | null;
                                availableCarbohydrateWithoutSugarAlcohols: string | null;
                                availableCarbohydrateWithSugarAlcohols: string | null;
                                isUserCreated: boolean | null;
                                isSupplement: boolean | null;
                                isPrivate: boolean | null;
                                viewableBy: string | null;
                                intervale: string | null;
                                ingredientToGroceryStore: {
                                    id: number;
                                    createdAt: Date;
                                    ingredientId: number | null;
                                    groceryStoreId: number | null;
                                    groceryStore: {
                                        id: number;
                                        name: string | null;
                                        createdAt: Date;
                                        location: string | null;
                                    } | null;
                                }[];
                            };
                        }[];
                    } | null;
                }[];
                mealToVegeStack: {
                    id: number;
                    createdAt: Date;
                    calories: string | null;
                    note: string | null;
                    mealId: number | null;
                    vegeStackId: number | null;
                    vegeStack: {
                        id: number;
                        name: string | null;
                        notes: string | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                        calories: string | null;
                        veges: string | null;
                    } | null;
                }[];
            } | undefined;
            meta: object;
        }>;
        create: _trpc_server.TRPCMutationProcedure<{
            input: {
                name: string;
                description: string;
                image: string;
                notes: string;
                mealCategory: string;
                recipes: {
                    recipeId: number;
                    note: string;
                    index: number;
                }[];
                veges?: {
                    vegeStackId: number;
                    note: string;
                    calories: string;
                } | undefined;
            };
            output: {
                id: number;
            }[] | {
                res: {
                    id: number;
                }[];
                recipeRes: {
                    id: number;
                }[];
            };
            meta: object;
        }>;
        update: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
                name: string;
                description: string;
                image: string;
                notes: string;
                mealCategory: string;
                recipes: {
                    recipeId: number;
                    note: string;
                    index: number;
                }[];
                veges?: {
                    vegeStackId: number;
                    note: string;
                    calories: string;
                } | undefined;
            };
            output: {
                res: _libsql_client.ResultSet;
                recipeRes: {
                    id: number;
                }[];
            };
            meta: object;
        }>;
        updateFavourite: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        deleteFavourite: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        delete: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        deleteAll: _trpc_server.TRPCMutationProcedure<{
            input: void;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
    }>>;
    userPlan: _trpc_server.TRPCBuiltRouter<{
        ctx: {
            headers: Headers;
            db: drizzle_orm_libsql.LibSQLDatabase<typeof ______db_schema> & {
                $client: _libsql_client.Client;
            };
            session: next_auth.Session | null;
        };
        meta: object;
        errorShape: {
            data: {
                zodError: zod.ZodFlattenedError<unknown, string> | null;
                code: _trpc_server.TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: _trpc_server.TRPC_ERROR_CODE_NUMBER;
        };
        transformer: true;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        delete: _trpc_server.TRPCMutationProcedure<{
            input: number;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        finishPlan: _trpc_server.TRPCMutationProcedure<{
            input: number;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        activePlan: _trpc_server.TRPCMutationProcedure<{
            input: number;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        getMeal: _trpc_server.TRPCQueryProcedure<{
            input: number;
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date | null;
                protein: string | null;
                calories: string | null;
                note: string | null;
                userPlanId: number;
                mealIndex: number | null;
                vegeCalories: string | null;
                veges: string | null;
                vegeNotes: string | null;
                mealTitle: string | null;
                targetProtein: string | null;
                targetCalories: string | null;
            } | undefined;
            meta: object;
        }>;
        getRecipe: _trpc_server.TRPCQueryProcedure<{
            input: number;
            output: {
                id: number;
                name: string | null;
                createdAt: Date;
                updatedAt: Date | null;
                serveUnit: string | null;
                isUserCreated: boolean | null;
                index: number | null;
                serve: string | null;
                note: string | null;
                userPlanId: number | null;
                dailyLogId: number | null;
                mealIndex: number | null;
                dailyMealId: number | null;
                recipeIndex: number | null;
                parentId: number | null;
                isLog: boolean | null;
            } | undefined;
            meta: object;
        }>;
        getIngredient: _trpc_server.TRPCQueryProcedure<{
            input: number;
            output: {
                id: number;
                name: string | null;
                createdAt: Date;
                updatedAt: Date | null;
                serveUnit: string | null;
                isUserCreated: boolean | null;
                ingredientId: number | null;
                alternateId: number | null;
                serve: string | null;
                note: string | null;
                userPlanId: number | null;
                dailyLogId: number | null;
                mealIndex: number | null;
                dailyMealId: number | null;
                recipeIndex: number | null;
                ingredient: {
                    id: number;
                    name: string | null;
                    notes: string | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                    userId: string | null;
                    favouriteAt: Date | null;
                    deletedAt: Date | null;
                    hiddenAt: Date | null;
                    isAusFood: boolean | null;
                    isAllStores: boolean | null;
                    serveSize: string | null;
                    serveUnit: string | null;
                    publicFoodKey: string | null;
                    classification: string | null;
                    foodName: string | null;
                    caloriesWFibre: string | null;
                    caloriesWOFibre: string | null;
                    protein: string | null;
                    fatTotal: string | null;
                    totalDietaryFibre: string | null;
                    totalSugars: string | null;
                    starch: string | null;
                    resistantStarch: string | null;
                    availableCarbohydrateWithoutSugarAlcohols: string | null;
                    availableCarbohydrateWithSugarAlcohols: string | null;
                    isUserCreated: boolean | null;
                    isSupplement: boolean | null;
                    isPrivate: boolean | null;
                    viewableBy: string | null;
                    intervale: string | null;
                } | null;
                alternateIngredient: {
                    id: number;
                    name: string | null;
                    notes: string | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                    userId: string | null;
                    favouriteAt: Date | null;
                    deletedAt: Date | null;
                    hiddenAt: Date | null;
                    isAusFood: boolean | null;
                    isAllStores: boolean | null;
                    serveSize: string | null;
                    serveUnit: string | null;
                    publicFoodKey: string | null;
                    classification: string | null;
                    foodName: string | null;
                    caloriesWFibre: string | null;
                    caloriesWOFibre: string | null;
                    protein: string | null;
                    fatTotal: string | null;
                    totalDietaryFibre: string | null;
                    totalSugars: string | null;
                    starch: string | null;
                    resistantStarch: string | null;
                    availableCarbohydrateWithoutSugarAlcohols: string | null;
                    availableCarbohydrateWithSugarAlcohols: string | null;
                    isUserCreated: boolean | null;
                    isSupplement: boolean | null;
                    isPrivate: boolean | null;
                    viewableBy: string | null;
                    intervale: string | null;
                } | null;
            } | undefined;
            meta: object;
        }>;
        get: _trpc_server.TRPCQueryProcedure<{
            input: number;
            output: {
                id: number;
                name: string;
                notes: string;
                image: string;
                createdAt: Date;
                updatedAt: Date | null;
                description: string;
                userId: string;
                finishedAt: Date | null;
                startAt: Date | null;
                isActive: boolean | null;
                numberOfMeals: number | null;
                creatorId: string;
                favouriteAt: Date | null;
                deletedAt: Date | null;
                hiddenAt: Date | null;
                userMeals: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date | null;
                    protein: string | null;
                    calories: string | null;
                    note: string | null;
                    userPlanId: number;
                    mealIndex: number | null;
                    vegeCalories: string | null;
                    veges: string | null;
                    vegeNotes: string | null;
                    mealTitle: string | null;
                    targetProtein: string | null;
                    targetCalories: string | null;
                }[];
                userRecipes: {
                    id: number;
                    name: string | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                    serveUnit: string | null;
                    isUserCreated: boolean | null;
                    index: number | null;
                    serve: string | null;
                    note: string | null;
                    userPlanId: number | null;
                    dailyLogId: number | null;
                    mealIndex: number | null;
                    dailyMealId: number | null;
                    recipeIndex: number | null;
                    parentId: number | null;
                    isLog: boolean | null;
                }[];
                userIngredients: {
                    id: number;
                    name: string | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                    serveUnit: string | null;
                    isUserCreated: boolean | null;
                    ingredientId: number | null;
                    alternateId: number | null;
                    serve: string | null;
                    note: string | null;
                    userPlanId: number | null;
                    dailyLogId: number | null;
                    mealIndex: number | null;
                    dailyMealId: number | null;
                    recipeIndex: number | null;
                    ingredient: {
                        id: number;
                        name: string | null;
                        notes: string | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                        userId: string | null;
                        favouriteAt: Date | null;
                        deletedAt: Date | null;
                        hiddenAt: Date | null;
                        isAusFood: boolean | null;
                        isAllStores: boolean | null;
                        serveSize: string | null;
                        serveUnit: string | null;
                        publicFoodKey: string | null;
                        classification: string | null;
                        foodName: string | null;
                        caloriesWFibre: string | null;
                        caloriesWOFibre: string | null;
                        protein: string | null;
                        fatTotal: string | null;
                        totalDietaryFibre: string | null;
                        totalSugars: string | null;
                        starch: string | null;
                        resistantStarch: string | null;
                        availableCarbohydrateWithoutSugarAlcohols: string | null;
                        availableCarbohydrateWithSugarAlcohols: string | null;
                        isUserCreated: boolean | null;
                        isSupplement: boolean | null;
                        isPrivate: boolean | null;
                        viewableBy: string | null;
                        intervale: string | null;
                    } | null;
                    alternateIngredient: {
                        id: number;
                        name: string | null;
                        notes: string | null;
                        createdAt: Date;
                        updatedAt: Date | null;
                        userId: string | null;
                        favouriteAt: Date | null;
                        deletedAt: Date | null;
                        hiddenAt: Date | null;
                        isAusFood: boolean | null;
                        isAllStores: boolean | null;
                        serveSize: string | null;
                        serveUnit: string | null;
                        publicFoodKey: string | null;
                        classification: string | null;
                        foodName: string | null;
                        caloriesWFibre: string | null;
                        caloriesWOFibre: string | null;
                        protein: string | null;
                        fatTotal: string | null;
                        totalDietaryFibre: string | null;
                        totalSugars: string | null;
                        starch: string | null;
                        resistantStarch: string | null;
                        availableCarbohydrateWithoutSugarAlcohols: string | null;
                        availableCarbohydrateWithSugarAlcohols: string | null;
                        isUserCreated: boolean | null;
                        isSupplement: boolean | null;
                        isPrivate: boolean | null;
                        viewableBy: string | null;
                        intervale: string | null;
                    } | null;
                }[];
            } | undefined;
            meta: object;
        }>;
        create: _trpc_server.TRPCMutationProcedure<{
            input: {
                name: string;
                description: string;
                image: string;
                notes: string;
                userId: string;
                meals: {
                    mealIndex: number;
                    mealTitle: string;
                    calories: string;
                    targetProtein: string;
                    targetCalories: string;
                    vegeCalories: string;
                    veges: string;
                    vegeNotes: string;
                    note: string;
                    recipes: {
                        recipeIndex: number;
                        mealIndex: number;
                        name: string;
                        note: string;
                        description: string;
                        index: number;
                        ingredients: {
                            ingredientId: number;
                            ingredientIndex: number;
                            recipeIndex: number;
                            mealIndex: number;
                            alternateId: number | null;
                            name: string;
                            serve: string;
                            serveUnit: string;
                            note: string;
                        }[];
                    }[];
                    protein?: string | undefined;
                }[];
            };
            output: {
                id: number;
            }[] | {
                res: {
                    id: number;
                }[];
                batchRes: [{
                    id: number;
                }[], {
                    id: number;
                }[], {
                    id: number;
                }[]];
            };
            meta: object;
        }>;
    }>>;
    weighIn: _trpc_server.TRPCBuiltRouter<{
        ctx: {
            headers: Headers;
            db: drizzle_orm_libsql.LibSQLDatabase<typeof ______db_schema> & {
                $client: _libsql_client.Client;
            };
            session: next_auth.Session | null;
        };
        meta: object;
        errorShape: {
            data: {
                zodError: zod.ZodFlattenedError<unknown, string> | null;
                code: _trpc_server.TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: _trpc_server.TRPC_ERROR_CODE_NUMBER;
        };
        transformer: true;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        create: _trpc_server.TRPCMutationProcedure<{
            input: {
                bodyWeight: string;
                bodyFat: string;
                leanMass: string;
                bloodPressure: string;
                userId: string;
                trainerId: string;
                date?: Date | undefined;
                notes?: string | undefined;
                image?: string | undefined;
            };
            output: {
                res: {
                    id: number;
                }[];
            };
            meta: object;
        }>;
        getAllUser: _trpc_server.TRPCQueryProcedure<{
            input: string;
            output: {
                date: Date;
                id: number;
                notes: string | null;
                image: string | null;
                createdAt: Date;
                userId: string;
                trainerId: string;
                bodyWeight: string | null;
                leanMass: string | null;
                bodyFat: string | null;
                bloodPressure: string | null;
            }[];
            meta: object;
        }>;
        get: _trpc_server.TRPCQueryProcedure<{
            input: number;
            output: {
                date: Date;
                id: number;
                notes: string | null;
                image: string | null;
                createdAt: Date;
                userId: string;
                trainerId: string;
                bodyWeight: string | null;
                leanMass: string | null;
                bodyFat: string | null;
                bloodPressure: string | null;
            } | undefined;
            meta: object;
        }>;
        delete: _trpc_server.TRPCMutationProcedure<{
            input: number;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        deleteAll: _trpc_server.TRPCMutationProcedure<{
            input: string;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
    }>>;
    message: _trpc_server.TRPCBuiltRouter<{
        ctx: {
            headers: Headers;
            db: drizzle_orm_libsql.LibSQLDatabase<typeof ______db_schema> & {
                $client: _libsql_client.Client;
            };
            session: next_auth.Session | null;
        };
        meta: object;
        errorShape: {
            data: {
                zodError: zod.ZodFlattenedError<unknown, string> | null;
                code: _trpc_server.TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: _trpc_server.TRPC_ERROR_CODE_NUMBER;
        };
        transformer: true;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        create: _trpc_server.TRPCMutationProcedure<{
            input: {
                userId: string;
                fromUserId: string;
                subject: string;
                message: string;
                isImportant: boolean;
                image?: string | undefined;
            };
            output: {
                res: {
                    id: number;
                }[];
            };
            meta: object;
        }>;
        getAllUser: _trpc_server.TRPCQueryProcedure<{
            input: string;
            output: {
                message: string | null;
                id: number;
                image: string | null;
                createdAt: Date;
                userId: string | null;
                isRead: boolean | null;
                isViewed: boolean | null;
                isDeleted: boolean | null;
                subject: string | null;
                isImportant: boolean | null;
                fromUserId: string | null;
                user: {
                    id: string;
                    name: string | null;
                    firstName: string | null;
                    lastName: string | null;
                    clerkId: string | null;
                    birthDate: Date | null;
                    gender: string | null;
                    address: string | null;
                    notes: string | null;
                    instagram: string | null;
                    openLifter: string | null;
                    phone: string | null;
                    email: string | null;
                    emailVerified: Date | null;
                    password: string | null;
                    currentPlanId: number | null;
                    image: string | null;
                    isFake: boolean | null;
                    isTrainer: boolean | null;
                    isRoot: boolean | null;
                    isCreator: boolean | null;
                    isAllTrainers: boolean | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                } | null;
                fromUser: {
                    id: string;
                    name: string | null;
                    firstName: string | null;
                    lastName: string | null;
                    clerkId: string | null;
                    birthDate: Date | null;
                    gender: string | null;
                    address: string | null;
                    notes: string | null;
                    instagram: string | null;
                    openLifter: string | null;
                    phone: string | null;
                    email: string | null;
                    emailVerified: Date | null;
                    password: string | null;
                    currentPlanId: number | null;
                    image: string | null;
                    isFake: boolean | null;
                    isTrainer: boolean | null;
                    isRoot: boolean | null;
                    isCreator: boolean | null;
                    isAllTrainers: boolean | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                } | null;
            }[];
            meta: object;
        }>;
        getAllFromUser: _trpc_server.TRPCQueryProcedure<{
            input: string;
            output: {
                message: string | null;
                id: number;
                image: string | null;
                createdAt: Date;
                userId: string | null;
                isRead: boolean | null;
                isViewed: boolean | null;
                isDeleted: boolean | null;
                subject: string | null;
                isImportant: boolean | null;
                fromUserId: string | null;
                user: {
                    id: string;
                    name: string | null;
                    firstName: string | null;
                    lastName: string | null;
                    clerkId: string | null;
                    birthDate: Date | null;
                    gender: string | null;
                    address: string | null;
                    notes: string | null;
                    instagram: string | null;
                    openLifter: string | null;
                    phone: string | null;
                    email: string | null;
                    emailVerified: Date | null;
                    password: string | null;
                    currentPlanId: number | null;
                    image: string | null;
                    isFake: boolean | null;
                    isTrainer: boolean | null;
                    isRoot: boolean | null;
                    isCreator: boolean | null;
                    isAllTrainers: boolean | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                } | null;
                fromUser: {
                    id: string;
                    name: string | null;
                    firstName: string | null;
                    lastName: string | null;
                    clerkId: string | null;
                    birthDate: Date | null;
                    gender: string | null;
                    address: string | null;
                    notes: string | null;
                    instagram: string | null;
                    openLifter: string | null;
                    phone: string | null;
                    email: string | null;
                    emailVerified: Date | null;
                    password: string | null;
                    currentPlanId: number | null;
                    image: string | null;
                    isFake: boolean | null;
                    isTrainer: boolean | null;
                    isRoot: boolean | null;
                    isCreator: boolean | null;
                    isAllTrainers: boolean | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                } | null;
            }[];
            meta: object;
        }>;
        get: _trpc_server.TRPCQueryProcedure<{
            input: number;
            output: {
                message: string | null;
                id: number;
                image: string | null;
                createdAt: Date;
                userId: string | null;
                isRead: boolean | null;
                isViewed: boolean | null;
                isDeleted: boolean | null;
                subject: string | null;
                isImportant: boolean | null;
                fromUserId: string | null;
            } | undefined;
            meta: object;
        }>;
        markAsViewed: _trpc_server.TRPCMutationProcedure<{
            input: number;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        markAsRead: _trpc_server.TRPCMutationProcedure<{
            input: number;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        markFromUserAsViewedAndRead: _trpc_server.TRPCMutationProcedure<{
            input: string;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        delete: _trpc_server.TRPCMutationProcedure<{
            input: number;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        deletePermanently: _trpc_server.TRPCMutationProcedure<{
            input: number;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
    }>>;
    metrics: _trpc_server.TRPCBuiltRouter<{
        ctx: {
            headers: Headers;
            db: drizzle_orm_libsql.LibSQLDatabase<typeof ______db_schema> & {
                $client: _libsql_client.Client;
            };
            session: next_auth.Session | null;
        };
        meta: object;
        errorShape: {
            data: {
                zodError: zod.ZodFlattenedError<unknown, string> | null;
                code: _trpc_server.TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: _trpc_server.TRPC_ERROR_CODE_NUMBER;
        };
        transformer: true;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        updateGallery: _trpc_server.TRPCMutationProcedure<{
            input: {
                image: string;
                userId: string;
            };
            output: {
                res: _libsql_client.ResultSet;
            };
            meta: object;
        }>;
        getUserSkinfolds: _trpc_server.TRPCQueryProcedure<{
            input: string;
            output: {
                test: string | null;
                date: string;
                id: number;
                notes: string | null;
                createdAt: Date;
                userId: string;
                creatorId: string | null;
                chin: string | null;
                cheek: string | null;
                lowerAbdominal: string | null;
                pectoral: string | null;
                biceps: string | null;
                triceps: string | null;
                subscapular: string | null;
                midAxillary: string | null;
                suprailiac: string | null;
                umbilical: string | null;
                lowerBack: string | null;
                quadriceps: string | null;
                hamstrings: string | null;
                medialCalf: string | null;
                knee: string | null;
                shoulder: string | null;
                formula: string | null;
                bodyWeight: {
                    date: string;
                    id: number;
                    notes: string | null;
                    createdAt: Date;
                    userId: string;
                    bodyWeight: string | null;
                    skinfoldId: number | null;
                    source: string | null;
                }[];
                leanMass: {
                    date: string;
                    id: number;
                    notes: string | null;
                    createdAt: Date;
                    userId: string;
                    leanMass: string | null;
                    formula: string | null;
                    skinfoldId: number | null;
                }[];
                bodyFat: {
                    date: string;
                    id: number;
                    notes: string | null;
                    createdAt: Date;
                    userId: string;
                    bodyFat: string | null;
                    formula: string | null;
                    skinfoldId: number | null;
                }[];
            }[];
            meta: object;
        }>;
        getAllSkinfolds: _trpc_server.TRPCQueryProcedure<{
            input: void;
            output: {
                test: string | null;
                date: string;
                id: number;
                notes: string | null;
                createdAt: Date;
                userId: string;
                creatorId: string | null;
                chin: string | null;
                cheek: string | null;
                lowerAbdominal: string | null;
                pectoral: string | null;
                biceps: string | null;
                triceps: string | null;
                subscapular: string | null;
                midAxillary: string | null;
                suprailiac: string | null;
                umbilical: string | null;
                lowerBack: string | null;
                quadriceps: string | null;
                hamstrings: string | null;
                medialCalf: string | null;
                knee: string | null;
                shoulder: string | null;
                formula: string | null;
                user: {
                    id: string;
                    name: string | null;
                    firstName: string | null;
                    lastName: string | null;
                    clerkId: string | null;
                    birthDate: Date | null;
                    gender: string | null;
                    address: string | null;
                    notes: string | null;
                    instagram: string | null;
                    openLifter: string | null;
                    phone: string | null;
                    email: string | null;
                    emailVerified: Date | null;
                    password: string | null;
                    currentPlanId: number | null;
                    image: string | null;
                    isFake: boolean | null;
                    isTrainer: boolean | null;
                    isRoot: boolean | null;
                    isCreator: boolean | null;
                    isAllTrainers: boolean | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                };
                bodyWeight: {
                    date: string;
                    id: number;
                    notes: string | null;
                    createdAt: Date;
                    userId: string;
                    bodyWeight: string | null;
                    skinfoldId: number | null;
                    source: string | null;
                }[];
                leanMass: {
                    date: string;
                    id: number;
                    notes: string | null;
                    createdAt: Date;
                    userId: string;
                    leanMass: string | null;
                    formula: string | null;
                    skinfoldId: number | null;
                }[];
                bodyFat: {
                    date: string;
                    id: number;
                    notes: string | null;
                    createdAt: Date;
                    userId: string;
                    bodyFat: string | null;
                    formula: string | null;
                    skinfoldId: number | null;
                }[];
            }[];
            meta: object;
        }>;
        getSkinfold: _trpc_server.TRPCQueryProcedure<{
            input: number;
            output: {
                test: string | null;
                date: string;
                id: number;
                notes: string | null;
                createdAt: Date;
                userId: string;
                creatorId: string | null;
                chin: string | null;
                cheek: string | null;
                lowerAbdominal: string | null;
                pectoral: string | null;
                biceps: string | null;
                triceps: string | null;
                subscapular: string | null;
                midAxillary: string | null;
                suprailiac: string | null;
                umbilical: string | null;
                lowerBack: string | null;
                quadriceps: string | null;
                hamstrings: string | null;
                medialCalf: string | null;
                knee: string | null;
                shoulder: string | null;
                formula: string | null;
                bodyWeight: {
                    date: string;
                    id: number;
                    notes: string | null;
                    createdAt: Date;
                    userId: string;
                    bodyWeight: string | null;
                    skinfoldId: number | null;
                    source: string | null;
                }[];
                leanMass: {
                    date: string;
                    id: number;
                    notes: string | null;
                    createdAt: Date;
                    userId: string;
                    leanMass: string | null;
                    formula: string | null;
                    skinfoldId: number | null;
                }[];
                bodyFat: {
                    date: string;
                    id: number;
                    notes: string | null;
                    createdAt: Date;
                    userId: string;
                    bodyFat: string | null;
                    formula: string | null;
                    skinfoldId: number | null;
                }[];
            } | undefined;
            meta: object;
        }>;
        deleteSkinfold: _trpc_server.TRPCMutationProcedure<{
            input: number;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        createSkinfold: _trpc_server.TRPCMutationProcedure<{
            input: {
                date: string;
                chin: string;
                cheek: string;
                lowerAbdominal: string;
                pectoral: string;
                biceps: string;
                triceps: string;
                subscapular: string;
                midAxillary: string;
                suprailiac: string;
                umbilical: string;
                lowerBack: string;
                quadriceps: string;
                hamstrings: string;
                medialCalf: string;
                knee: string;
                shoulder: string;
                notes: string;
                userId: string;
                bodyWeight: string;
                leanMass: string;
                bodyFat: string;
            };
            output: {
                res: {
                    id: number;
                }[];
            };
            meta: object;
        }>;
    }>>;
    trainer: _trpc_server.TRPCBuiltRouter<{
        ctx: {
            headers: Headers;
            db: drizzle_orm_libsql.LibSQLDatabase<typeof ______db_schema> & {
                $client: _libsql_client.Client;
            };
            session: next_auth.Session | null;
        };
        meta: object;
        errorShape: {
            data: {
                zodError: zod.ZodFlattenedError<unknown, string> | null;
                code: _trpc_server.TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: _trpc_server.TRPC_ERROR_CODE_NUMBER;
        };
        transformer: true;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        getAll: _trpc_server.TRPCQueryProcedure<{
            input: void;
            output: {
                id: string;
                name: string | null;
            }[];
            meta: object;
        }>;
        add: _trpc_server.TRPCMutationProcedure<{
            input: {
                userId: string;
                trainerId: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        delete: _trpc_server.TRPCMutationProcedure<{
            input: {
                userId: string;
                trainerId: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
    }>>;
    supplement: _trpc_server.TRPCBuiltRouter<{
        ctx: {
            headers: Headers;
            db: drizzle_orm_libsql.LibSQLDatabase<typeof ______db_schema> & {
                $client: _libsql_client.Client;
            };
            session: next_auth.Session | null;
        };
        meta: object;
        errorShape: {
            data: {
                zodError: zod.ZodFlattenedError<unknown, string> | null;
                code: _trpc_server.TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: _trpc_server.TRPC_ERROR_CODE_NUMBER;
        };
        transformer: true;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        delete: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        getAll: _trpc_server.TRPCQueryProcedure<{
            input: void;
            output: {
                id: number;
                name: string | null;
                notes: string | null;
                createdAt: Date;
                updatedAt: Date | null;
                userId: string | null;
                favouriteAt: Date | null;
                deletedAt: Date | null;
                hiddenAt: Date | null;
                isAusFood: boolean | null;
                isAllStores: boolean | null;
                serveSize: string | null;
                serveUnit: string | null;
                publicFoodKey: string | null;
                classification: string | null;
                foodName: string | null;
                caloriesWFibre: string | null;
                caloriesWOFibre: string | null;
                protein: string | null;
                fatTotal: string | null;
                totalDietaryFibre: string | null;
                totalSugars: string | null;
                starch: string | null;
                resistantStarch: string | null;
                availableCarbohydrateWithoutSugarAlcohols: string | null;
                availableCarbohydrateWithSugarAlcohols: string | null;
                isUserCreated: boolean | null;
                isSupplement: boolean | null;
                isPrivate: boolean | null;
                viewableBy: string | null;
                intervale: string | null;
                user: {
                    id: string;
                    name: string | null;
                } | null;
            }[];
            meta: object;
        }>;
        getSupplementFromDailyLog: _trpc_server.TRPCQueryProcedure<{
            input: {
                id: number;
            };
            output: boolean;
            meta: object;
        }>;
        getFullSupplement: _trpc_server.TRPCQueryProcedure<{
            input: {
                id: number;
            };
            output: {
                id: number;
                name: string | null;
                notes: string | null;
                createdAt: Date;
                updatedAt: Date | null;
                userId: string | null;
                favouriteAt: Date | null;
                deletedAt: Date | null;
                hiddenAt: Date | null;
                isAusFood: boolean | null;
                isAllStores: boolean | null;
                serveSize: string | null;
                serveUnit: string | null;
                publicFoodKey: string | null;
                classification: string | null;
                foodName: string | null;
                caloriesWFibre: string | null;
                caloriesWOFibre: string | null;
                protein: string | null;
                fatTotal: string | null;
                totalDietaryFibre: string | null;
                totalSugars: string | null;
                starch: string | null;
                resistantStarch: string | null;
                availableCarbohydrateWithoutSugarAlcohols: string | null;
                availableCarbohydrateWithSugarAlcohols: string | null;
                isUserCreated: boolean | null;
                isSupplement: boolean | null;
                isPrivate: boolean | null;
                viewableBy: string | null;
                intervale: string | null;
                user: {
                    id: string;
                    name: string | null;
                } | null;
                ingredientAdditionOne: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date | null;
                    ingredientId: number | null;
                    energyWithDietaryFibre: string | null;
                    energyWithoutDietaryFibre: string | null;
                    addedSugars: string | null;
                    freeSugars: string | null;
                    moisture: string | null;
                    nitrogen: string | null;
                    alcohol: string | null;
                    fructose: string | null;
                    glucose: string | null;
                    sucrose: string | null;
                    maltose: string | null;
                    lactose: string | null;
                    galactose: string | null;
                    maltotrios: string | null;
                    ash: string | null;
                    dextrin: string | null;
                    glycerol: string | null;
                    glycogen: string | null;
                    inulin: string | null;
                    erythritol: string | null;
                    maltitol: string | null;
                    mannitol: string | null;
                    xylitol: string | null;
                    maltodextrin: string | null;
                    oligosaccharides: string | null;
                    polydextrose: string | null;
                    raffinose: string | null;
                    stachyose: string | null;
                    sorbitol: string | null;
                };
                ingredientAdditionTwo: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date | null;
                    ingredientId: number | null;
                    aceticAcid: string | null;
                    citricAcid: string | null;
                    fumaricAcid: string | null;
                    lacticAcid: string | null;
                    malicAcid: string | null;
                    oxalicAcid: string | null;
                    propionicAcid: string | null;
                    quinicAcid: string | null;
                    shikimicAcid: string | null;
                    succinicAcid: string | null;
                    tartaricAcid: string | null;
                    aluminium: string | null;
                    antimony: string | null;
                    arsenic: string | null;
                    cadmium: string | null;
                    calcium: string | null;
                    chromium: string | null;
                    chloride: string | null;
                    cobalt: string | null;
                    copper: string | null;
                    fluoride: string | null;
                    iodine: string | null;
                    iron: string | null;
                    lead: string | null;
                    magnesium: string | null;
                    manganese: string | null;
                    mercury: string | null;
                    molybdenum: string | null;
                    nickel: string | null;
                    phosphorus: string | null;
                    potassium: string | null;
                    selenium: string | null;
                    sodium: string | null;
                    sulphur: string | null;
                    tin: string | null;
                    zinc: string | null;
                    retinol: string | null;
                    alphaCarotene: string | null;
                    betaCarotene: string | null;
                    cryptoxanthin: string | null;
                    betaCaroteneEquivalents: string | null;
                    vitaminARetinolEquivalents: string | null;
                    lutein: string | null;
                    lycopene: string | null;
                    xanthophyl: string | null;
                    thiamin: string | null;
                    riboflavin: string | null;
                    niacin: string | null;
                    niacinDerivedFromTryptophan: string | null;
                    niacinDerivedEquivalents: string | null;
                    pantothenicAcid: string | null;
                    pyridoxine: string | null;
                    biotin: string | null;
                    cobalamin: string | null;
                    folateNatural: string | null;
                    folicAcid: string | null;
                    totalFolates: string | null;
                    dietaryFolateEquivalents: string | null;
                    vitaminC: string | null;
                    cholecalciferol: string | null;
                    ergocalciferol: string | null;
                    hydroxyCholecalciferol: string | null;
                    hydroxyErgocalciferol: string | null;
                    vitaminDEquivalents: string | null;
                    alphaTocopherol: string | null;
                    alphaTocotrienol: string | null;
                    betaTocopherol: string | null;
                    betaTocotrienol: string | null;
                    deltaTocopherol: string | null;
                    deltaTocotrienol: string | null;
                    gammaTocopherol: string | null;
                    gammaTocotrienol: string | null;
                    vitaminE: string | null;
                };
                ingredientAdditionThree: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date | null;
                    ingredientId: number | null;
                    totalSaturatedFattyAcids: string | null;
                    totalMonounsaturatedFattyAcids: string | null;
                    totalPolyunsaturatedFattyAcids: string | null;
                    totalLongChainOmega3FattyAcids: string | null;
                    totalTransFattyAcids: string | null;
                    caffeine: string | null;
                    cholesterol: string | null;
                    alanine: string | null;
                    arginine: string | null;
                    asparticAcid: string | null;
                    cystinePlusCysteine: string | null;
                    glutamicAcid: string | null;
                    glycine: string | null;
                    histidine: string | null;
                    isoleucine: string | null;
                    leucine: string | null;
                    lysine: string | null;
                    methionine: string | null;
                    phenylalanine: string | null;
                    proline: string | null;
                    serine: string | null;
                    threonine: string | null;
                    tyrosine: string | null;
                    tryptophan: string | null;
                    valine: string | null;
                    c4: string | null;
                    c6: string | null;
                    c8: string | null;
                    c10: string | null;
                    c11: string | null;
                    c12: string | null;
                    c13: string | null;
                    c14: string | null;
                    c15: string | null;
                    c16: string | null;
                    c17: string | null;
                    c18: string | null;
                    c19: string | null;
                    c20: string | null;
                    c21: string | null;
                    c22: string | null;
                    c23: string | null;
                    c24: string | null;
                    totalSaturatedFattyAcidsEquated: string | null;
                    c10_1: string | null;
                    c12_1: string | null;
                    c14_1: string | null;
                    c15_1: string | null;
                    c16_1: string | null;
                    c17_1: string | null;
                    c18_1: string | null;
                    c18_1w5: string | null;
                    c18_1w6: string | null;
                    c18_1w7: string | null;
                    c18_1w9: string | null;
                    c20_1: string | null;
                    c20_1w9: string | null;
                    c20_1w13: string | null;
                    c20_1w11: string | null;
                    c22_1: string | null;
                    c22_1w9: string | null;
                    c22_1w11: string | null;
                    c24_1: string | null;
                    c24_1w9: string | null;
                    c24_1w11: string | null;
                    c24_1w13: string | null;
                    totalMonounsaturatedFattyAcidsEquated: string | null;
                    c12_2: string | null;
                    c16_2w4: string | null;
                    c16_3: string | null;
                    c18_2w6: string | null;
                    c18_3w3: string | null;
                    c18_3w4: string | null;
                    c18_3w6: string | null;
                    c18_4w1: string | null;
                    c18_4w3: string | null;
                    c20_2: string | null;
                    c20_2w6: string | null;
                    c20_3: string | null;
                    c20_3w3: string | null;
                    c20_3w6: string | null;
                    c20_4: string | null;
                    c20_4w3: string | null;
                    c20_4w6: string | null;
                    c20_5w3: string | null;
                    c21_5w3: string | null;
                    c22_2: string | null;
                    c22_2w6: string | null;
                    c22_4w6: string | null;
                    c22_5w3: string | null;
                    c22_5w6: string | null;
                    c22_6w3: string | null;
                    totalPolyunsaturatedFattyAcidsEquated: string | null;
                };
            } | undefined;
            meta: object;
        }>;
        getSupplement: _trpc_server.TRPCQueryProcedure<{
            input: {
                id: number;
            };
            output: {
                id: number;
                name: string | null;
                notes: string | null;
                createdAt: Date;
                updatedAt: Date | null;
                userId: string | null;
                favouriteAt: Date | null;
                deletedAt: Date | null;
                hiddenAt: Date | null;
                isAusFood: boolean | null;
                isAllStores: boolean | null;
                serveSize: string | null;
                serveUnit: string | null;
                publicFoodKey: string | null;
                classification: string | null;
                foodName: string | null;
                caloriesWFibre: string | null;
                caloriesWOFibre: string | null;
                protein: string | null;
                fatTotal: string | null;
                totalDietaryFibre: string | null;
                totalSugars: string | null;
                starch: string | null;
                resistantStarch: string | null;
                availableCarbohydrateWithoutSugarAlcohols: string | null;
                availableCarbohydrateWithSugarAlcohols: string | null;
                isUserCreated: boolean | null;
                isSupplement: boolean | null;
                isPrivate: boolean | null;
                viewableBy: string | null;
                intervale: string | null;
                user: {
                    id: string;
                    name: string | null;
                } | null;
            } | undefined;
            meta: object;
        }>;
        addTime: _trpc_server.TRPCMutationProcedure<{
            input: {
                time: string;
                userId: string;
            };
            output: {
                id: number;
            }[];
            meta: object;
        }>;
        getSuppFromPlan: _trpc_server.TRPCQueryProcedure<{
            input: {
                id: number;
            };
            output: {
                id: number;
                supplementId: number;
                supplementStackId: number;
                size: string | null;
                unit: string | null;
                supplement: {
                    id: number;
                    name: string | null;
                    notes: string | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                    userId: string | null;
                    favouriteAt: Date | null;
                    deletedAt: Date | null;
                    hiddenAt: Date | null;
                    isAusFood: boolean | null;
                    isAllStores: boolean | null;
                    serveSize: string | null;
                    serveUnit: string | null;
                    publicFoodKey: string | null;
                    classification: string | null;
                    foodName: string | null;
                    caloriesWFibre: string | null;
                    caloriesWOFibre: string | null;
                    protein: string | null;
                    fatTotal: string | null;
                    totalDietaryFibre: string | null;
                    totalSugars: string | null;
                    starch: string | null;
                    resistantStarch: string | null;
                    availableCarbohydrateWithoutSugarAlcohols: string | null;
                    availableCarbohydrateWithSugarAlcohols: string | null;
                    isUserCreated: boolean | null;
                    isSupplement: boolean | null;
                    isPrivate: boolean | null;
                    viewableBy: string | null;
                    intervale: string | null;
                };
            } | undefined;
            meta: object;
        }>;
        addToUser: _trpc_server.TRPCMutationProcedure<{
            input: {
                suppId: number;
                userId: string;
                time: string;
                size: string;
                unit: string;
            };
            output: boolean;
            meta: object;
        }>;
        logSupplement: _trpc_server.TRPCMutationProcedure<{
            input: {
                suppId: number;
                suppName: string;
                date: string;
                time: string;
                amount: string;
                unit: string;
                stackId: string;
            };
            output: boolean;
            meta: object;
        }>;
        unLogSupplement: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: boolean;
            meta: object;
        }>;
        deleteFromUser: _trpc_server.TRPCMutationProcedure<{
            input: {
                suppId: number;
                suppStackId: number;
            };
            output: boolean;
            meta: object;
        }>;
        deleteTime: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: boolean;
            meta: object;
        }>;
        userCreate: _trpc_server.TRPCMutationProcedure<{
            input: {
                name: string;
                serveSize: number;
                serveUnit: string;
                isPrivate: boolean;
                stackId: number;
                userId: string;
                viewableBy?: string | undefined;
            };
            output: {
                id: number;
            }[];
            meta: object;
        }>;
        update: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
                isPrivate: boolean;
                viewableBy: string;
                name: string;
                serveSize: number;
                serveUnit: string;
                caloriesWFibre: number;
                caloriesWOFibre: number;
                protein: number;
                fatTotal: number;
                totalDietaryFibre: number;
                totalSugars: number;
                starch: number;
                resistantStarch: number;
                availableCarbohydrateWithoutSugarAlcohols: number;
                availableCarbohydrateWithSugarAlcohols: number;
                addedSugars: number;
                freeSugars: number;
                moisture: number;
                nitrogen: number;
                alcohol: number;
                fructose: number;
                glucose: number;
                sucrose: number;
                maltose: number;
                lactose: number;
                galactose: number;
                maltotrios: number;
                ash: number;
                dextrin: number;
                glycerol: number;
                glycogen: number;
                inulin: number;
                erythritol: number;
                maltitol: number;
                mannitol: number;
                xylitol: number;
                maltodextrin: number;
                oligosaccharides: number;
                polydextrose: number;
                raffinose: number;
                stachyose: number;
                sorbitol: number;
                aceticAcid: number;
                citricAcid: number;
                fumaricAcid: number;
                lacticAcid: number;
                malicAcid: number;
                oxalicAcid: number;
                propionicAcid: number;
                quinicAcid: number;
                shikimicAcid: number;
                succinicAcid: number;
                tartaricAcid: number;
                aluminium: number;
                antimony: number;
                arsenic: number;
                cadmium: number;
                calcium: number;
                chromium: number;
                chloride: number;
                cobalt: number;
                copper: number;
                fluoride: number;
                iodine: number;
                iron: number;
                lead: number;
                magnesium: number;
                manganese: number;
                mercury: number;
                molybdenum: number;
                nickel: number;
                phosphorus: number;
                potassium: number;
                selenium: number;
                sodium: number;
                sulphur: number;
                tin: number;
                zinc: number;
                retinol: number;
                alphaCarotene: number;
                betaCarotene: number;
                cryptoxanthin: number;
                betaCaroteneEquivalents: number;
                vitaminARetinolEquivalents: number;
                lutein: number;
                lycopene: number;
                xanthophyl: number;
                thiamin: number;
                riboflavin: number;
                niacin: number;
                niacinDerivedFromTryptophan: number;
                niacinDerivedEquivalents: number;
                pantothenicAcid: number;
                pyridoxine: number;
                biotin: number;
                cobalamin: number;
                folateNatural: number;
                folicAcid: number;
                totalFolates: number;
                dietaryFolateEquivalents: number;
                vitaminC: number;
                cholecalciferol: number;
                ergocalciferol: number;
                hydroxyCholecalciferol: number;
                hydroxyErgocalciferol: number;
                vitaminDEquivalents: number;
                alphaTocopherol: number;
                alphaTocotrienol: number;
                betaTocopherol: number;
                betaTocotrienol: number;
                deltaTocopherol: number;
                deltaTocotrienol: number;
                gammaTocopherol: number;
                gammaTocotrienol: number;
                vitaminE: number;
                totalSaturatedFattyAcids: number;
                totalMonounsaturatedFattyAcids: number;
                totalPolyunsaturatedFattyAcids: number;
                totalLongChainOmega3FattyAcids: number;
                totalTransFattyAcids: number;
                caffeine: number;
                cholesterol: number;
                alanine: number;
                arginine: number;
                asparticAcid: number;
                cystinePlusCysteine: number;
                glutamicAcid: number;
                glycine: number;
                histidine: number;
                isoleucine: number;
                leucine: number;
                lysine: number;
                methionine: number;
                phenylalanine: number;
                proline: number;
                serine: number;
                threonine: number;
                tyrosine: number;
                tryptophan: number;
                valine: number;
                c4: number;
                c6: number;
                c8: number;
                c10: number;
                c11: number;
                c12: number;
                c13: number;
                c14: number;
                c15: number;
                c16: number;
                c17: number;
                c18: number;
                c19: number;
                c20: number;
                c21: number;
                c22: number;
                c23: number;
                c24: number;
                totalSaturatedFattyAcidsEquated: number;
                c10_1: number;
                c12_1: number;
                c14_1: number;
                c15_1: number;
                c16_1: number;
                c17_1: number;
                c18_1: number;
                c18_1w5: number;
                c18_1w6: number;
                c18_1w7: number;
                c18_1w9: number;
                c20_1: number;
                c20_1w9: number;
                c20_1w13: number;
                c20_1w11: number;
                c22_1: number;
                c22_1w9: number;
                c22_1w11: number;
                c24_1: number;
                c24_1w9: number;
                c24_1w11: number;
                c24_1w13: number;
                totalMonounsaturatedFattyAcidsEquated: number;
                c12_2: number;
                c16_2w4: number;
                c16_3: number;
                c18_2w6: number;
                c18_3w3: number;
                c18_3w4: number;
                c18_3w6: number;
                c18_4w1: number;
                c18_4w3: number;
                c20_2: number;
                c20_2w6: number;
                c20_3: number;
                c20_3w3: number;
                c20_3w6: number;
                c20_4: number;
                c20_4w3: number;
                c20_4w6: number;
                c20_5w3: number;
                c21_5w3: number;
                c22_2: number;
                c22_2w6: number;
                c22_4w6: number;
                c22_5w3: number;
                c22_5w6: number;
                c22_6w3: number;
                totalPolyunsaturatedFattyAcidsEquated: number;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        create: _trpc_server.TRPCMutationProcedure<{
            input: {
                name: string;
                isPrivate: boolean;
                viewableBy: string;
                serveSize: number;
                serveUnit: string;
                caloriesWFibre: number;
                caloriesWOFibre: number;
                protein: number;
                fatTotal: number;
                totalDietaryFibre: number;
                totalSugars: number;
                starch: number;
                resistantStarch: number;
                availableCarbohydrateWithoutSugarAlcohols: number;
                availableCarbohydrateWithSugarAlcohols: number;
                addedSugars: number;
                freeSugars: number;
                moisture: number;
                nitrogen: number;
                alcohol: number;
                fructose: number;
                glucose: number;
                sucrose: number;
                maltose: number;
                lactose: number;
                galactose: number;
                maltotrios: number;
                ash: number;
                dextrin: number;
                glycerol: number;
                glycogen: number;
                inulin: number;
                erythritol: number;
                maltitol: number;
                mannitol: number;
                xylitol: number;
                maltodextrin: number;
                oligosaccharides: number;
                polydextrose: number;
                raffinose: number;
                stachyose: number;
                sorbitol: number;
                aceticAcid: number;
                citricAcid: number;
                fumaricAcid: number;
                lacticAcid: number;
                malicAcid: number;
                oxalicAcid: number;
                propionicAcid: number;
                quinicAcid: number;
                shikimicAcid: number;
                succinicAcid: number;
                tartaricAcid: number;
                aluminium: number;
                antimony: number;
                arsenic: number;
                cadmium: number;
                calcium: number;
                chromium: number;
                chloride: number;
                cobalt: number;
                copper: number;
                fluoride: number;
                iodine: number;
                iron: number;
                lead: number;
                magnesium: number;
                manganese: number;
                mercury: number;
                molybdenum: number;
                nickel: number;
                phosphorus: number;
                potassium: number;
                selenium: number;
                sodium: number;
                sulphur: number;
                tin: number;
                zinc: number;
                retinol: number;
                alphaCarotene: number;
                betaCarotene: number;
                cryptoxanthin: number;
                betaCaroteneEquivalents: number;
                vitaminARetinolEquivalents: number;
                lutein: number;
                lycopene: number;
                xanthophyl: number;
                thiamin: number;
                riboflavin: number;
                niacin: number;
                niacinDerivedFromTryptophan: number;
                niacinDerivedEquivalents: number;
                pantothenicAcid: number;
                pyridoxine: number;
                biotin: number;
                cobalamin: number;
                folateNatural: number;
                folicAcid: number;
                totalFolates: number;
                dietaryFolateEquivalents: number;
                vitaminC: number;
                cholecalciferol: number;
                ergocalciferol: number;
                hydroxyCholecalciferol: number;
                hydroxyErgocalciferol: number;
                vitaminDEquivalents: number;
                alphaTocopherol: number;
                alphaTocotrienol: number;
                betaTocopherol: number;
                betaTocotrienol: number;
                deltaTocopherol: number;
                deltaTocotrienol: number;
                gammaTocopherol: number;
                gammaTocotrienol: number;
                vitaminE: number;
                totalSaturatedFattyAcids: number;
                totalMonounsaturatedFattyAcids: number;
                totalPolyunsaturatedFattyAcids: number;
                totalLongChainOmega3FattyAcids: number;
                totalTransFattyAcids: number;
                caffeine: number;
                cholesterol: number;
                alanine: number;
                arginine: number;
                asparticAcid: number;
                cystinePlusCysteine: number;
                glutamicAcid: number;
                glycine: number;
                histidine: number;
                isoleucine: number;
                leucine: number;
                lysine: number;
                methionine: number;
                phenylalanine: number;
                proline: number;
                serine: number;
                threonine: number;
                tyrosine: number;
                tryptophan: number;
                valine: number;
                c4: number;
                c6: number;
                c8: number;
                c10: number;
                c11: number;
                c12: number;
                c13: number;
                c14: number;
                c15: number;
                c16: number;
                c17: number;
                c18: number;
                c19: number;
                c20: number;
                c21: number;
                c22: number;
                c23: number;
                c24: number;
                totalSaturatedFattyAcidsEquated: number;
                c10_1: number;
                c12_1: number;
                c14_1: number;
                c15_1: number;
                c16_1: number;
                c17_1: number;
                c18_1: number;
                c18_1w5: number;
                c18_1w6: number;
                c18_1w7: number;
                c18_1w9: number;
                c20_1: number;
                c20_1w9: number;
                c20_1w13: number;
                c20_1w11: number;
                c22_1: number;
                c22_1w9: number;
                c22_1w11: number;
                c24_1: number;
                c24_1w9: number;
                c24_1w11: number;
                c24_1w13: number;
                totalMonounsaturatedFattyAcidsEquated: number;
                c12_2: number;
                c16_2w4: number;
                c16_3: number;
                c18_2w6: number;
                c18_3w3: number;
                c18_3w4: number;
                c18_3w6: number;
                c18_4w1: number;
                c18_4w3: number;
                c20_2: number;
                c20_2w6: number;
                c20_3: number;
                c20_3w3: number;
                c20_3w6: number;
                c20_4: number;
                c20_4w3: number;
                c20_4w6: number;
                c20_5w3: number;
                c21_5w3: number;
                c22_2: number;
                c22_2w6: number;
                c22_4w6: number;
                c22_5w3: number;
                c22_5w6: number;
                c22_6w3: number;
                totalPolyunsaturatedFattyAcidsEquated: number;
            };
            output: {
                id: number;
            }[];
            meta: object;
        }>;
    }>>;
    trainerNotes: _trpc_server.TRPCBuiltRouter<{
        ctx: {
            headers: Headers;
            db: drizzle_orm_libsql.LibSQLDatabase<typeof ______db_schema> & {
                $client: _libsql_client.Client;
            };
            session: next_auth.Session | null;
        };
        meta: object;
        errorShape: {
            data: {
                zodError: zod.ZodFlattenedError<unknown, string> | null;
                code: _trpc_server.TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: _trpc_server.TRPC_ERROR_CODE_NUMBER;
        };
        transformer: true;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        getAllUser: _trpc_server.TRPCQueryProcedure<{
            input: {
                userId: string;
            };
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date | null;
                description: string | null;
                userId: string;
                title: string | null;
                trainerId: string;
                state: string | null;
                trainer: {
                    id: string;
                    name: string | null;
                    firstName: string | null;
                    lastName: string | null;
                    clerkId: string | null;
                    birthDate: Date | null;
                    gender: string | null;
                    address: string | null;
                    notes: string | null;
                    instagram: string | null;
                    openLifter: string | null;
                    phone: string | null;
                    email: string | null;
                    emailVerified: Date | null;
                    password: string | null;
                    currentPlanId: number | null;
                    image: string | null;
                    isFake: boolean | null;
                    isTrainer: boolean | null;
                    isRoot: boolean | null;
                    isCreator: boolean | null;
                    isAllTrainers: boolean | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                };
            }[];
            meta: object;
        }>;
        get: _trpc_server.TRPCQueryProcedure<{
            input: {
                id: number;
            };
            output: {
                id: number;
                createdAt: Date;
                updatedAt: Date | null;
                description: string | null;
                userId: string;
                title: string | null;
                trainerId: string;
                state: string | null;
                trainer: {
                    id: string;
                    name: string | null;
                    firstName: string | null;
                    lastName: string | null;
                    clerkId: string | null;
                    birthDate: Date | null;
                    gender: string | null;
                    address: string | null;
                    notes: string | null;
                    instagram: string | null;
                    openLifter: string | null;
                    phone: string | null;
                    email: string | null;
                    emailVerified: Date | null;
                    password: string | null;
                    currentPlanId: number | null;
                    image: string | null;
                    isFake: boolean | null;
                    isTrainer: boolean | null;
                    isRoot: boolean | null;
                    isCreator: boolean | null;
                    isAllTrainers: boolean | null;
                    createdAt: Date;
                    updatedAt: Date | null;
                };
            } | undefined;
            meta: object;
        }>;
        create: _trpc_server.TRPCMutationProcedure<{
            input: {
                userId: string;
                title: string;
                description: string;
                state: string;
            };
            output: {
                id: number;
            }[];
            meta: object;
        }>;
        update: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
                title: string;
                description: string;
                state: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        delete: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
    }>>;
    userCatagories: _trpc_server.TRPCBuiltRouter<{
        ctx: {
            headers: Headers;
            db: drizzle_orm_libsql.LibSQLDatabase<typeof ______db_schema> & {
                $client: _libsql_client.Client;
            };
            session: next_auth.Session | null;
        };
        meta: object;
        errorShape: {
            data: {
                zodError: zod.ZodFlattenedError<unknown, string> | null;
                code: _trpc_server.TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: _trpc_server.TRPC_ERROR_CODE_NUMBER;
        };
        transformer: true;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        getAll: _trpc_server.TRPCQueryProcedure<{
            input: void;
            output: {
                id: number;
                name: string | null;
            }[];
            meta: object;
        }>;
        create: _trpc_server.TRPCMutationProcedure<{
            input: string;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        update: _trpc_server.TRPCMutationProcedure<{
            input: {
                id: number;
                name: string;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        delete: _trpc_server.TRPCMutationProcedure<{
            input: number;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        addToUser: _trpc_server.TRPCMutationProcedure<{
            input: {
                userId: string;
                categoryId: number;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        removeFromUser: _trpc_server.TRPCMutationProcedure<{
            input: {
                userId: string;
                categoryId: number;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
    }>>;
    notifications: _trpc_server.TRPCBuiltRouter<{
        ctx: {
            headers: Headers;
            db: drizzle_orm_libsql.LibSQLDatabase<typeof ______db_schema> & {
                $client: _libsql_client.Client;
            };
            session: next_auth.Session | null;
        };
        meta: object;
        errorShape: {
            data: {
                zodError: zod.ZodFlattenedError<unknown, string> | null;
                code: _trpc_server.TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: _trpc_server.TRPC_ERROR_CODE_NUMBER;
        };
        transformer: true;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        create: _trpc_server.TRPCMutationProcedure<{
            input: {
                userId: string;
                code: string;
                title: string;
                description?: string | undefined;
                notes?: string | undefined;
            };
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        get: _trpc_server.TRPCQueryProcedure<{
            input: number;
            output: {
                id: number;
                notes: string | null;
                createdAt: Date;
                description: string | null;
                userId: string | null;
                code: string | null;
                title: string | null;
                isRead: boolean | null;
                isViewed: boolean | null;
                isDeleted: boolean | null;
            } | undefined;
            meta: object;
        }>;
        getAll: _trpc_server.TRPCQueryProcedure<{
            input: void;
            output: {
                id: number;
                notes: string | null;
                createdAt: Date;
                description: string | null;
                userId: string | null;
                code: string | null;
                title: string | null;
                isRead: boolean | null;
                isViewed: boolean | null;
                isDeleted: boolean | null;
            }[];
            meta: object;
        }>;
        getAllUser: _trpc_server.TRPCQueryProcedure<{
            input: string;
            output: {
                id: number;
                notes: string | null;
                createdAt: Date;
                description: string | null;
                userId: string | null;
                code: string | null;
                title: string | null;
                isRead: boolean | null;
                isViewed: boolean | null;
                isDeleted: boolean | null;
            }[];
            meta: object;
        }>;
        delete: _trpc_server.TRPCMutationProcedure<{
            input: number;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        markAsRead: _trpc_server.TRPCMutationProcedure<{
            input: number;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        markAllAsViewed: _trpc_server.TRPCMutationProcedure<{
            input: string;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
        markAsViewed: _trpc_server.TRPCMutationProcedure<{
            input: number;
            output: _libsql_client.ResultSet;
            meta: object;
        }>;
    }>>;
    adminLog: _trpc_server.TRPCBuiltRouter<{
        ctx: {
            headers: Headers;
            db: drizzle_orm_libsql.LibSQLDatabase<typeof ______db_schema> & {
                $client: _libsql_client.Client;
            };
            session: next_auth.Session | null;
        };
        meta: object;
        errorShape: {
            data: {
                zodError: zod.ZodFlattenedError<unknown, string> | null;
                code: _trpc_server.TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: _trpc_server.TRPC_ERROR_CODE_NUMBER;
        };
        transformer: true;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        create: _trpc_server.TRPCMutationProcedure<{
            input: {
                task: string;
                notes: string;
            };
            output: boolean;
            meta: object;
        }>;
    }>>;
}>>;

export { type AppRouter, appRouter, createCaller };
