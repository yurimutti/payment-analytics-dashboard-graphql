/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query AnalyticsKpi($start: Int, $end: Int, $currency: Currencies, $interval: Interval) {\n    chargesDateRangeKPI(start: $start, end: $end, currency: $currency, interval: $interval) {\n      currency\n      total {\n        succeededAmount\n        succeededCount\n        capturedAmount\n        capturedCount\n        canceledAmount\n        canceledCount\n        refundedAmount\n        refundedCount\n        failedAmount\n        failedCount\n      }\n      data {\n        timestamp\n        succeededAmount\n        succeededCount\n        capturedAmount\n        capturedCount\n        failedAmount\n        failedCount\n        canceledAmount\n        canceledCount\n        refundedAmount\n        refundedCount\n      }\n    }\n  }\n": typeof types.AnalyticsKpiDocument,
    "\n  query RecentCharges {\n    charges(size: 5) {\n      items {\n        id\n        amount\n        currency\n        status\n        createdAt\n        orderId\n        customer { name email }\n        paymentMethod { method }\n      }\n      total\n    }\n  }\n": typeof types.RecentChargesDocument,
    "\n  query Charge($id: ID!) {\n    charge(id: $id) {\n      id\n      amount\n      currency\n      status\n      createdAt\n      updatedAt\n      orderId\n      sequenceId\n      descriptor\n      description\n      livemode\n      statusCode\n      statusMessage\n      customer { name email phone }\n      paymentMethod {\n        method\n        card { brand last4 expiration }\n      }\n      metadata { key value }\n    }\n  }\n": typeof types.ChargeDocument,
    "\n  query Charges(\n    $search: String\n    $filter: SearchableChargeFilterInput\n    $size: Int\n    $from: Int\n  ) {\n    charges(search: $search, filter: $filter, size: $size, from: $from) {\n      items {\n        id\n        amount\n        currency\n        status\n        createdAt\n        updatedAt\n        orderId\n        livemode\n        customer { name email phone }\n        paymentMethod {\n          method\n          card { brand last4 expiration }\n        }\n      }\n      total\n    }\n  }\n": typeof types.ChargesDocument,
};
const documents: Documents = {
    "\n  query AnalyticsKpi($start: Int, $end: Int, $currency: Currencies, $interval: Interval) {\n    chargesDateRangeKPI(start: $start, end: $end, currency: $currency, interval: $interval) {\n      currency\n      total {\n        succeededAmount\n        succeededCount\n        capturedAmount\n        capturedCount\n        canceledAmount\n        canceledCount\n        refundedAmount\n        refundedCount\n        failedAmount\n        failedCount\n      }\n      data {\n        timestamp\n        succeededAmount\n        succeededCount\n        capturedAmount\n        capturedCount\n        failedAmount\n        failedCount\n        canceledAmount\n        canceledCount\n        refundedAmount\n        refundedCount\n      }\n    }\n  }\n": types.AnalyticsKpiDocument,
    "\n  query RecentCharges {\n    charges(size: 5) {\n      items {\n        id\n        amount\n        currency\n        status\n        createdAt\n        orderId\n        customer { name email }\n        paymentMethod { method }\n      }\n      total\n    }\n  }\n": types.RecentChargesDocument,
    "\n  query Charge($id: ID!) {\n    charge(id: $id) {\n      id\n      amount\n      currency\n      status\n      createdAt\n      updatedAt\n      orderId\n      sequenceId\n      descriptor\n      description\n      livemode\n      statusCode\n      statusMessage\n      customer { name email phone }\n      paymentMethod {\n        method\n        card { brand last4 expiration }\n      }\n      metadata { key value }\n    }\n  }\n": types.ChargeDocument,
    "\n  query Charges(\n    $search: String\n    $filter: SearchableChargeFilterInput\n    $size: Int\n    $from: Int\n  ) {\n    charges(search: $search, filter: $filter, size: $size, from: $from) {\n      items {\n        id\n        amount\n        currency\n        status\n        createdAt\n        updatedAt\n        orderId\n        livemode\n        customer { name email phone }\n        paymentMethod {\n          method\n          card { brand last4 expiration }\n        }\n      }\n      total\n    }\n  }\n": types.ChargesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AnalyticsKpi($start: Int, $end: Int, $currency: Currencies, $interval: Interval) {\n    chargesDateRangeKPI(start: $start, end: $end, currency: $currency, interval: $interval) {\n      currency\n      total {\n        succeededAmount\n        succeededCount\n        capturedAmount\n        capturedCount\n        canceledAmount\n        canceledCount\n        refundedAmount\n        refundedCount\n        failedAmount\n        failedCount\n      }\n      data {\n        timestamp\n        succeededAmount\n        succeededCount\n        capturedAmount\n        capturedCount\n        failedAmount\n        failedCount\n        canceledAmount\n        canceledCount\n        refundedAmount\n        refundedCount\n      }\n    }\n  }\n"): (typeof documents)["\n  query AnalyticsKpi($start: Int, $end: Int, $currency: Currencies, $interval: Interval) {\n    chargesDateRangeKPI(start: $start, end: $end, currency: $currency, interval: $interval) {\n      currency\n      total {\n        succeededAmount\n        succeededCount\n        capturedAmount\n        capturedCount\n        canceledAmount\n        canceledCount\n        refundedAmount\n        refundedCount\n        failedAmount\n        failedCount\n      }\n      data {\n        timestamp\n        succeededAmount\n        succeededCount\n        capturedAmount\n        capturedCount\n        failedAmount\n        failedCount\n        canceledAmount\n        canceledCount\n        refundedAmount\n        refundedCount\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query RecentCharges {\n    charges(size: 5) {\n      items {\n        id\n        amount\n        currency\n        status\n        createdAt\n        orderId\n        customer { name email }\n        paymentMethod { method }\n      }\n      total\n    }\n  }\n"): (typeof documents)["\n  query RecentCharges {\n    charges(size: 5) {\n      items {\n        id\n        amount\n        currency\n        status\n        createdAt\n        orderId\n        customer { name email }\n        paymentMethod { method }\n      }\n      total\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Charge($id: ID!) {\n    charge(id: $id) {\n      id\n      amount\n      currency\n      status\n      createdAt\n      updatedAt\n      orderId\n      sequenceId\n      descriptor\n      description\n      livemode\n      statusCode\n      statusMessage\n      customer { name email phone }\n      paymentMethod {\n        method\n        card { brand last4 expiration }\n      }\n      metadata { key value }\n    }\n  }\n"): (typeof documents)["\n  query Charge($id: ID!) {\n    charge(id: $id) {\n      id\n      amount\n      currency\n      status\n      createdAt\n      updatedAt\n      orderId\n      sequenceId\n      descriptor\n      description\n      livemode\n      statusCode\n      statusMessage\n      customer { name email phone }\n      paymentMethod {\n        method\n        card { brand last4 expiration }\n      }\n      metadata { key value }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Charges(\n    $search: String\n    $filter: SearchableChargeFilterInput\n    $size: Int\n    $from: Int\n  ) {\n    charges(search: $search, filter: $filter, size: $size, from: $from) {\n      items {\n        id\n        amount\n        currency\n        status\n        createdAt\n        updatedAt\n        orderId\n        livemode\n        customer { name email phone }\n        paymentMethod {\n          method\n          card { brand last4 expiration }\n        }\n      }\n      total\n    }\n  }\n"): (typeof documents)["\n  query Charges(\n    $search: String\n    $filter: SearchableChargeFilterInput\n    $size: Int\n    $from: Int\n  ) {\n    charges(search: $search, filter: $filter, size: $size, from: $from) {\n      items {\n        id\n        amount\n        currency\n        status\n        createdAt\n        updatedAt\n        orderId\n        livemode\n        customer { name email phone }\n        paymentMethod {\n          method\n          card { brand last4 expiration }\n        }\n      }\n      total\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;