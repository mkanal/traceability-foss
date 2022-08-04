/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { I18NEXT_NAMESPACE_RESOLVER } from 'angular-i18next';
import { InvestigationsComponent } from './presentation/investigations.component';

export /** @type {*} */
const INVESTIGATIONS_ROUTING: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: InvestigationsComponent,
    data: { i18nextNamespaces: ['page.investigations'] },
    resolve: { i18next: I18NEXT_NAMESPACE_RESOLVER },
  },
];

@NgModule({
  imports: [RouterModule.forChild(INVESTIGATIONS_ROUTING)],
  exports: [RouterModule],
})
export class InvestigationsRoutingModule {}
