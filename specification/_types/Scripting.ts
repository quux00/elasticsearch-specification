/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { Dictionary } from '@spec_utils/Dictionary'
import { UserDefinedValue } from '@spec_utils/UserDefinedValue'
import { Id } from './common'

/**
 * @doc_id modules-scripting
 * @non_exhaustive
 */
export enum ScriptLanguage {
  /**
   * Painless scripting language, purpose-built for Elasticsearch.
   */
  painless = 0,
  /**
   * Lucene’s expressions language, compiles a JavaScript expression to bytecode.
   */
  expression = 1,
  /**
   * Mustache templated, used for templates.
   */
  mustache = 2,
  /**
   * Expert Java API
   */
  java = 3
}

export class StoredScript {
  /**
   * Specifies the language the script is written in.
   */
  lang: ScriptLanguage
  options?: Dictionary<string, string>
  /**
   * The script source.
   */
  source: string
}

export class ScriptBase {
  /**
   * Specifies any named parameters that are passed into the script as variables.
   * Use parameters instead of hard-coded values to decrease compile time.
   */
  params?: Dictionary<string, UserDefinedValue>
}

/** @shortcut_property source */
export class InlineScript extends ScriptBase {
  /**
   * Specifies the language the script is written in.
   * @server_default painless
   */
  lang?: ScriptLanguage
  options?: Dictionary<string, string>
  /**
   * The script source.
   */
  source: string
}

export class StoredScriptId extends ScriptBase {
  /**
   * The `id` for a stored script.
   */
  id: Id
}

/** @codegen_names inline, stored */
export type Script = InlineScript | StoredScriptId

export class ScriptField {
  script: Script
  ignore_failure?: boolean
}
