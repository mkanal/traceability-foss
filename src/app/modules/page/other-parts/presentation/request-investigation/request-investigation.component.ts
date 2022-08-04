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

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getInvestigationInboxRoute } from '@page/investigations/investigations-external-route';
import { OtherPartsFacade } from '@page/other-parts/core/other-parts.facade';
import { Part } from '@page/parts/model/parts.model';
import { CtaNotificationService } from '@shared/components/call-to-action-notifications/cta-notification.service';
import { InvestigationStatusGroup } from '@shared/model/investigations.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-request-investigation',
  templateUrl: './request-investigation.component.html',
})
export class RequestInvestigationComponent {
  public isLoading$ = new BehaviorSubject(false);

  @Input() set isOpen(isOpen: boolean) {
    this.isOpen$.next(isOpen);
    if (!isOpen) {
      this.sidenavIsClosing.emit();
    }
  }

  @Input() selectedItems: Part[];
  @Output() deselectPart = new EventEmitter<Part>();
  @Output() clearSelected = new EventEmitter<void>();
  @Output() sidenavIsClosing = new EventEmitter<void>();

  constructor(
    private readonly qualityInvestigationFacade: OtherPartsFacade,
    private readonly ctaNotificationService: CtaNotificationService,
  ) {}

  public readonly isOpen$ = new BehaviorSubject<boolean>(false);
  public readonly textAreaControl = new FormControl(undefined, [
    Validators.required,
    Validators.maxLength(1000),
    Validators.minLength(15),
  ]);
  public readonly investigationFormGroup = new FormGroup({ description: this.textAreaControl });

  public submitInvestigation(): void {
    this.investigationFormGroup.markAllAsTouched();
    this.investigationFormGroup.updateValueAndValidity();

    if (this.investigationFormGroup.invalid) {
      return;
    }

    this.isLoading$.next(true);
    this.textAreaControl.disable();

    const amountOfItems = this.selectedItems.length;
    this.qualityInvestigationFacade.sendInvestigation(this.selectedItems, this.textAreaControl.value).subscribe({
      next: () => {
        this.isLoading$.next(false);
        this.textAreaControl.enable();

        this.isOpen = false;
        this.clearSelected.emit();

        this.textAreaControl.setValue(undefined);
        this.textAreaControl.markAsUntouched();

        this.openCtaNotification(amountOfItems);
      },
    });
  }

  private openCtaNotification(count: number): void {
    const { link, queryParams } = getInvestigationInboxRoute(InvestigationStatusGroup.QUEUED_AND_REQUESTED);

    this.ctaNotificationService.show(
      {
        id: 'qualityInvestigation.success',
        values: { count },
      },
      [
        {
          text: 'qualityInvestigation.goToQueue',
          linkQueryParams: queryParams,
          link,
        },
      ],
    );
  }
}
