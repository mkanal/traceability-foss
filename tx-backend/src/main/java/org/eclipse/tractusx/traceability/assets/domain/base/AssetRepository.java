/********************************************************************************
 * Copyright (c) 2023 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

package org.eclipse.tractusx.traceability.assets.domain.base;

import org.eclipse.tractusx.traceability.assets.domain.model.Asset;
import org.eclipse.tractusx.traceability.assets.domain.model.Owner;
import org.eclipse.tractusx.traceability.common.model.PageResult;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AssetRepository {
    Asset getAssetById(String assetId);

    boolean existsById(String globalAssetId);

    List<Asset> getAssetsById(List<String> assetIds);

    Asset getAssetByChildId(String assetId, String childId);

    PageResult<Asset> getAssets(Pageable pageable, Owner owner);

    List<Asset> getAssets();

    Asset save(Asset asset);

    List<Asset> saveAll(List<Asset> assets);

    long countAssets();

    void updateParentDescriptionsAndOwner(final Asset asset);

    long countAssetsByOwner(Owner owner);
}
