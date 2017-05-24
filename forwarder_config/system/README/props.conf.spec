#
# This file contains possible attribute/value pairs for configuring Splunk's
# processing properties via props.conf.
#
# Props.conf is commonly used for:
#
# * Configuring linebreaking for multiline events.
# * Setting up character set encoding.
# * Allowing processing of binary files.
# * Configuring timestamp recognition.
# * Configuring event segmentation.
# * Overriding Splunk's automated host and source type matching. You can use
#   props.conf to:
#     * Configure advanced (regex-based) host and source type overrides.
#     * Override source type matching for data from a particular source.
#     * Set up rule-based source type recognition.
#     * Rename source types.
# * Anonymizing certain types of sensitive incoming data, such as credit
#   card or social security numbers, using sed scripts.
# * Routing specific events to a particular index, when you have multiple
#   indexes.
# * Creating new index-time field extractions, including header-based field
#   extractions.
#   NOTE: We do not recommend adding to the set of fields that are extracted
#         at index time unless it is absolutely necessary because there are
#         negative performance implications.
# * Defining new search-time field extractions. You can define basic
#   search-time field extractions entirely through props.conf. But a
#   transforms.conf component is required if you need to create search-time
#   field extractions that involve one or more of the following:
#       * Reuse of the same field-extracting regular expression across
#         multiple sources, source types, or hosts.
#       * Application of more than one regex to the same source, source type,
#         or host.
#       * Delimiter-based field extractions (they involve field-value pairs
#         that are separated by commas, colons, semicolons, bars, or
#         something similar).
#       * Extraction of multiple values for the same field (multivalued
#         field extraction).
#       * Extraction of fields with names that begin with numbers or
#         underscores.
# * Setting up lookup tables that look up fields from external sources.
# * Creating field aliases.
#
# NOTE: Several of the above actions involve a corresponding transforms.conf
# configuration.
#
# You can find more information on these topics by searching the Splunk
# documentation (http://docs.splunk.com/Documentation/Splunk).
#
# There is a props.conf in $SPLUNK_HOME/etc/system/default/.  To set custom
# configurations, place a props.conf in $SPLUNK_HOME/etc/system/local/. For
# help, see props.conf.example.
#
# You can enable configurations changes made to props.conf by typing the
# following search string in Splunk Web:
#
# | extract reload=T
#
# To learn more about configuration files (including precedence) please see
# the documentation located at
# http://docs.splunk.com/Documentation/Splunk/latest/Admin/Aboutconfigurationfiles
#
# For more information about using props.conf in conjunction with
# distributed Splunk deployments, see the Distributed Deployment Manual.

# GLOBAL SETTINGS
# Use the [default] stanza to define any global settings.
#   * You can also define global settings outside of any stanza, at the top
#     of the file.
#   * Each conf file should have at most one default stanza. If there are
#     multiple default stanzas, attributes are combined. In the case of
#     multiple definitions of the same attribute, the last definition in the
#     file wins.
#   * If an attribute is defined at both the global level and in a specific
#     stanza, the value in the specific stanza takes precedence.

[<spec>]
* This stanza enables properties for a given <spec>.
* A props.conf file can contain multiple stanzas for any number of
  different <spec>.
* Follow this stanza name with any number of the following attribute/value
  pairs, as appropriate for what you want to do.
* If you do not set an attribute for a given <spec>, the default is used.

<spec> can be:
1. <sourcetype>, the source type of an event.
2. host::<host>, where <host> is the host, or host-matching pattern, for an
                 event.
3. source::<source>, where <source> is the source, or source-matching
                     pattern, for an event.
4. rule::<rulename>, where <rulename> is a unique name of a source type
                     classification rule.
5. delayedrule::<rulename>, where <rulename> is a unique name of a delayed
                            source type classification rule.
                            These are only considered as a last resort
                            before generating a new source type based on the
                            source seen.

**[<spec>] stanza precedence:**

For settings that are specified in multiple categories of matching [<spec>]
stanzas, [host::<host>] settings override [<sourcetype>] settings.
Additionally, [source::<source>] settings override both [host::<host>]
and [<sourcetype>] settings.

**Considerations for Windows file paths:**

When you specify Windows-based file paths as part of a [source::<source>]
stanza, you must escape any backslashes contained within the specified file
path.

Example: [source::c:\\path_to\\file.txt]

**[<spec>] stanza patterns:**

When setting a [<spec>] stanza, you can use the following regex-type syntax:
... recurses through directories until the match is met
    or equivalently, matches any number of characters.
*   matches anything but the path separator 0 or more times.
    The path separator is '/' on unix, or '\' on windows.
    Intended to match a partial or complete directory or filename.
|   is equivalent to 'or'
( ) are used to limit scope of |.

\\ = matches a literal backslash '\'.

Example: [source::....(?<!tar.)(gz|tgz)]

 This matches any file ending with '.gz' or '.bz2', provided this is not
 preceded by 'tar.', so tar.bz2 and tar.gz would not be matched.

**[source::<source>] and [host::<host>] stanza match language:**

Match expressions must match the entire name, not just a substring. If you
are familiar with regular expressions, match expressions are based on a full
implementation of PCRE with the translation of ..., * and . Thus . matches a
period, * matches non-directory separators, and ... matches any number of
any characters.

For more information see the wildcards section at:
http://docs.splunk.com/Documentation/Splunk/latest/Data/Specifyinputpathswithwildcards

**[<spec>] stanza pattern collisions:**

Suppose the source of a given input matches multiple [source::<source>]
patterns. If the [<spec>] stanzas for these patterns each supply distinct
settings, Splunk applies all of these settings.

However, suppose two [<spec>] stanzas supply the same setting. In this case,
Splunk chooses the value to apply based on the ASCII order of the patterns
in question.

For example, take this source:

    source::az

and the following colliding patterns:

    [source::...a...]
    sourcetype = a

    [source::...z...]
    sourcetype = z

In this case, the settings provided by the pattern [source::...a...] take
precedence over those provided by [source::...z...], and sourcetype ends up
with "a" as its value.

To override this default ASCII ordering, use the priority key:

    [source::...a...]
    sourcetype = a
    priority = 5

    [source::...z...]
    sourcetype = z
    priority = 10

Assigning a higher priority to the second stanza causes sourcetype to have
the value "z".

**Case-sensitivity for [<spec>] stanza matching:**

By default, [source::<source>] and [<sourcetype>] stanzas match in a
case-sensitive manner, while [host::<host>] stanzas match in a
case-insensitive manner. This is a convenient default, given that DNS names
are case-insensitive.

To force a [host::<host>] stanza to match in a case-sensitive manner use the
"(?-i)" option in its pattern.

For example:

    [host::foo]
    FIELDALIAS-a = a AS one

    [host::(?-i)bar]
    FIELDALIAS-b = b AS two

The first stanza will actually apply to events with host values of "FOO" or
"Foo" . The second stanza, on the other hand, will not apply to events with
host values of "BAR" or "Bar".

**Building the final [<spec>] stanza:**

The final [<spec>] stanza is built by layering together (1) literal-matching
stanzas (stanzas which match the string literally) and (2) any
regex-matching stanzas, according to the value of the priority field.

If not specified, the default value of the priority key is:
* 0 for pattern-matching stanzas.
* 100 for literal-matching stanzas.

NOTE: Setting the priority key to a value greater than 100 causes the
pattern-matched [<spec>] stanzas to override the values of the
literal-matching [<spec>] stanzas.

The priority key can also be used to resolve collisions
between [<sourcetype>] patterns and [host::<host>] patterns. However, be aware
that the priority key does *not* affect precedence across <spec> types. For
example, [<spec>] stanzas with [source::<source>] patterns take priority over
stanzas with [host::<host>] and [<sourcetype>] patterns, regardless of their
respective priority key values.


#******************************************************************************
# The possible attributes/value pairs for props.conf, and their
# default values, are:
#******************************************************************************

# International characters and character encoding.

CHARSET = <string>
* When set, Splunk assumes the input from the given [<spec>] is in the
  specified encoding.
* Can only be used as the basis of [<sourcetype>] or [source::<spec>], 
  not [host::<spec>].
* A list of valid encodings can be retrieved using the command "iconv -l" on
  most *nix systems.
* If an invalid encoding is specified, a warning is logged during initial
  configuration and further input from that [<spec>] is discarded.
* If the source encoding is valid, but some characters from the [<spec>] are
  not valid in the specified encoding, then the characters are escaped as
  hex (for example, "\xF3").
* When set to "AUTO", Splunk attempts to automatically determine the character encoding and
  convert text from that encoding to UTF-8.
* For a complete list of the character sets Splunk automatically detects,
  see the online documentation.
* This setting applies at input time, when data is first read by Splunk.
  The setting is used on a Splunk system that has configured inputs
  acquiring the data.
* Defaults to ASCII.


#******************************************************************************
# Line breaking
#******************************************************************************

# Use the following attributes to define the length of a line.

TRUNCATE = <non-negative integer>
* Change the default maximum line length (in bytes).
* Although this is in bytes, line length is rounded down when this would
  otherwise land mid-character for multi-byte characters.
* Set to 0 if you never want truncation (very long lines are, however, often
  a sign of garbage data).
* Defaults to 10000 bytes.

LINE_BREAKER = <regular expression>
* Specifies a regex that determines how the raw text stream is broken into
  initial events, before line merging takes place. (See the SHOULD_LINEMERGE
  attribute, below)
* Defaults to ([\r\n]+), meaning data is broken into an event for each line,
  delimited by any number of carriage return or newline characters.
* The regex must contain a capturing group -- a pair of parentheses which
  defines an identified subcomponent of the match.
* Wherever the regex matches, Splunk considers the start of the first
  capturing group to be the end of the previous event, and considers the end
  of the first capturing group to be the start of the next event.
* The contents of the first capturing group are discarded, and will not be
  present in any event.  You are telling Splunk that this text comes between
  lines.
* NOTE: You get a significant boost to processing speed when you use
  LINE_BREAKER to delimit multiline events (as opposed to using
  SHOULD_LINEMERGE to reassemble individual lines into multiline events).
  * When using LINE_BREAKER to delimit events, SHOULD_LINEMERGE should be set
    to false, to ensure no further combination of delimited events occurs.
  * Using LINE_BREAKER to delimit events is discussed in more detail in the web
    documentation at the following url:
    http://docs.splunk.com/Documentation/Splunk/latest/Data/indexmulti-lineevents

** Special considerations for LINE_BREAKER with branched expressions  **

When using LINE_BREAKER with completely independent patterns separated by
pipes, some special issues come into play.
    EG. LINE_BREAKER = pattern1|pattern2|pattern3

Note, this is not about all forms of alternation, eg there is nothing
particular special about
    example: LINE_BREAKER = ([\r\n])+(one|two|three)
where the top level remains a single expression.

A caution: Relying on these rules is NOT encouraged.  Simpler is better, in
both regular expressions and the complexity of the behavior they rely on.
If possible, it is strongly recommended that you reconstruct your regex to
have a leftmost capturing group that always matches.

It may be useful to use non-capturing groups if you need to express a group
before the text to discard.
    EG. LINE_BREAKER = (?:one|two)([\r\n]+)
    * This will match the text one, or two, followed by any amount of
      newlines or carriage returns.  The one-or-two group is non-capturing
      via the ?: prefix and will be skipped by LINE_BREAKER.

* A branched expression can match without the first capturing group
  matching, so the line breaker behavior becomes more complex.
  Rules:
  1: If the first capturing group is part of a match, it is considered the
     linebreak, as normal.
  2: If the first capturing group is not part of a match, the leftmost
     capturing group which is part of a match will be considered the linebreak.
  3: If no capturing group is part of the match, the linebreaker will assume
     that the linebreak is a zero-length break immediately preceding the match.

Example 1:  LINE_BREAKER = end(\n)begin|end2(\n)begin2|begin3

  * A line ending with 'end' followed a line beginning with 'begin' would
    match the first branch, and the first capturing group would have a match
    according to rule 1.  That particular newline would become a break
    between lines.
  * A line ending with 'end2' followed by a line beginning with 'begin2'
    would match the second branch and the second capturing group would have
    a match.  That second capturing group would become the linebreak
    according to rule 2, and the associated newline would become a break
    between lines.
  * The text 'begin3' anywhere in the file at all would match the third
    branch, and there would be no capturing group with a match.  A linebreak
    would be assumed immediately prior to the text 'begin3' so a linebreak
    would be inserted prior to this text in accordance with rule 3.  This
    means that a linebreak will occur before the text 'begin3' at any
    point in the text, whether a linebreak character exists or not.

Example 2: Example 1 would probably be better written as follows.  This is
           not equivalent for all possible files, but for most real files
           would be equivalent.

           LINE_BREAKER = end2?(\n)begin(2|3)?

LINE_BREAKER_LOOKBEHIND = <integer>
* When there is leftover data from a previous raw chunk,
  LINE_BREAKER_LOOKBEHIND indicates the number of bytes before the end of
  the raw chunk (with the next chunk concatenated) that Splunk applies the
  LINE_BREAKER regex. You may want to increase this value from its default
  if you are dealing with especially large or multiline events.
* Defaults to 100 (bytes).

# Use the following attributes to specify how multiline events are handled.

SHOULD_LINEMERGE = [true|false]
* When set to true, Splunk combines several lines of data into a single
  multiline event, based on the following configuration attributes.
* Defaults to true.

# When SHOULD_LINEMERGE is set to true, use the following attributes to
# define how Splunk builds multiline events.

BREAK_ONLY_BEFORE_DATE = [true|false]
* When set to true, Splunk creates a new event only if it encounters a new
  line with a date.
  * Note, when using DATETIME_CONFIG = CURRENT or NONE, this setting is not
    meaningful, as timestamps are not identified.
* Defaults to true.

BREAK_ONLY_BEFORE = <regular expression>
* When set, Splunk creates a new event only if it encounters a new line that
  matches the regular expression.
* Defaults to empty.

MUST_BREAK_AFTER = <regular expression>
* When set and the regular expression matches the current line, Splunk
  creates a new event for the next input line.
* Splunk may still break before the current line if another rule matches.
* Defaults to empty.

MUST_NOT_BREAK_AFTER = <regular expression>
* When set and the current line matches the regular expression, Splunk does
  not break on any subsequent lines until the MUST_BREAK_AFTER expression
  matches.
* Defaults to empty.

MUST_NOT_BREAK_BEFORE = <regular expression>
* When set and the current line matches the regular expression, Splunk does
  not break the last event before the current line.
* Defaults to empty.

MAX_EVENTS = <integer>
* Specifies the maximum number of input lines to add to any event.
* Splunk breaks after the specified number of lines are read.
* Defaults to 256 (lines).


#******************************************************************************
# Timestamp extraction configuration
#******************************************************************************

DATETIME_CONFIG = <filename relative to $SPLUNK_HOME>
* Specifies which file configures the timestamp extractor, which identifies
  timestamps from the event text.
* This configuration may also be set to "NONE" to prevent the timestamp
  extractor from running or "CURRENT" to assign the current system time to
  each event.
  * "CURRENT" will set the time of the event to the time that the event was
    merged from lines, or worded differently, the time it passed through the
    aggregator processor.
  * "NONE" will leave the event time set to whatever time was selected by
    the input layer
    * For data sent by splunk forwarders over the splunk protocol, the input
      layer will be the time that was selected on the forwarder by its input
      behavior (as below).
    * For file-based inputs (monitor, batch) the time chosen will be the
      modification timestamp on the file being read.
    * For other inputs, the time chosen will be the current system time when
      the event is read from the pipe/socket/etc.
  * Both "CURRENT" and "NONE" explicitly disable the per-text timestamp
    identification, so the default event boundary detection
    (BREAK_ONLY_BEFORE_DATE = true) is likely to not work as desired.  When
    using these settings, use SHOULD_LINEMERGE and/or the BREAK_ONLY_* ,
    MUST_BREAK_* settings to control event merging.
* Defaults to /etc/datetime.xml (for example, $SPLUNK_HOME/etc/datetime.xml).

TIME_PREFIX = <regular expression>
* If set, splunk scans the event text for a match for this regex in event
  text before attempting to extract a timestamp.
* The timestamping algorithm only looks for a timestamp in the text
  following the end of the first regex match.
* For example, if TIME_PREFIX is set to "abc123", only text following the
  first occurrence of the text abc123 will be used for timestamp extraction.
* If the TIME_PREFIX cannot be found in the event text, timestamp extraction
  will not occur.
* Defaults to empty.

MAX_TIMESTAMP_LOOKAHEAD = <integer>
* Specifies how far (in characters) into an event Splunk should look for a
  timestamp.
* This constraint to timestamp extraction is applied from the point of the
  TIME_PREFIX-set location.
* For example, if TIME_PREFIX positions a location 11 characters into the
  event, and MAX_TIMESTAMP_LOOKAHEAD is set to 10, timestamp extraction will
  be constrained to characters 11 through 20.
* If set to 0, or -1, the length constraint for timestamp recognition is
  effectively disabled.  This can have negative performance implications
  which scale with the length of input lines (or with event size when
  LINE_BREAKER is redefined for event splitting).
* Defaults to 150 (characters).

TIME_FORMAT = <strptime-style format>
* Specifies a strptime format string to extract the date.
* strptime is an industry standard for designating time formats.
* For more information on strptime, see "Configure timestamp recognition" in
  the online documentation.
* TIME_FORMAT starts reading after the TIME_PREFIX. If both are specified,
  the TIME_PREFIX regex must match up to and including the character before
  the TIME_FORMAT date.
* For good results, the <strptime-style format> should describe the day of
  the year and the time of day.
* Defaults to empty.

TZ = <timezone identifier>
* The algorithm for determining the time zone for a particular event is as
  follows:
* If the event has a timezone in its raw text (for example, UTC, -08:00),
  use that.
* If TZ is set to a valid timezone string, use that.
* If the event was forwarded, and the forwarder-indexer connection is using
  the 6.0+ forwarding protocol, use the timezone provided by the forwarder.
* Otherwise, use the timezone of the system that is running splunkd.
* Defaults to empty.

TZ_ALIAS = <key=value>[,<key=value>]...
* Provides splunk admin-level control over how timezone strings extracted
  from events are interpreted.
  * For example, EST can mean Eastern (US) Standard time, or Eastern
    (Australian) Standard time.  There are many other three letter timezone
    acronyms with many expansions.
* There is no requirement to use TZ_ALIAS if the traditional Splunk default
  mappings for these values have been as expected.  For example, EST maps to
  the Eastern US by default.
* Has no effect on TZ value; this only affects timezone strings from event
  text, either from any configured TIME_FORMAT, or from pattern-based guess
  fallback.
* The setting is a list of key=value pairs, separated by commas.
  * The key is matched against the text of the timezone specifier of the
    event, and the value is the timezone specifier to use when mapping the
    timestamp to UTC/GMT.
  * The value is another TZ specifier which expresses the desired offset.
  * Example: TZ_ALIAS = EST=GMT+10:00 (See props.conf.example for more/full
    examples)
* Defaults to unset.

MAX_DAYS_AGO = <integer>
* Specifies the maximum number of days past, from the current date, that an
  extracted date can be valid. Splunk still indexes events with dates older
  than MAX_DAYS_AGO with the timestamp of the last acceptable event. If no 
  such acceptable event exists, new events with timestamps older than MAX_DAYS_AGO 
  will use the current timestamp.
* For example, if MAX_DAYS_AGO = 10, Splunk applies the timestamp of the last 
  acceptable event to events with extracted timestamps older than 10 days in 
  the past. If no acceptable event exists, Splunk applies the current timestamp.
* Defaults to 2000 (days), maximum 10951.
* IMPORTANT: If your data is older than 2000 days, increase this setting.

MAX_DAYS_HENCE = <integer>
* Specifies the maximum number of days in the future from the current date
  that an extracted date can be valid. Splunk still indexes events with dates 
  more than MAX_DAYS_HENCE in the future with the timestamp of the last acceptable 
  event. If no such acceptable event exists, new events with timestamps after 
  MAX_DAYS_HENCE will use the current timestamp.
* For example, if MAX_DAYS_HENCE = 3, Splunk applies the timestamp of the last 
  acceptable event to events with extracted timestamps more than 3 days in the 
  future. If no acceptable event exists, Splunk applies the current timestamp.
* The default value includes dates from one day in the future.
* If your servers have the wrong date set or are in a timezone that is one
  day ahead, increase this value to at least 3.
* Defaults to 2 (days), maximum 10950.
* IMPORTANT: False positives are less likely with a tighter window, change
             with caution.

MAX_DIFF_SECS_AGO = <integer>
* This setting prevents Splunk Enterprise from rejecting events with timestamps
  that are out of order.
* Do not use this setting to filter events because Splunk Enterprise uses
  complicated heuristics for time parsing.
* Splunk Enterprise warns you if an event timestamp is more than <integer>
  seconds BEFORE the previous timestamp and does not have the same time
  format as the majority of timestamps from the source.
* After Splunk Enterprise throws the warning, it only rejects an event if it
  cannot apply a timestamp to the event (for example, if Splunk cannot
  recognize the time of the event.)
* IMPORTANT: If your timestamps are wildly out of order, consider increasing
  this value.
* Note: if the events contain time but not date (date determined another way,
  such as from a filename) this check will only consider the hour. (No one
  second granularity for this purpose.)
* Defaults to 3600 (one hour), maximum 2147483646.

MAX_DIFF_SECS_HENCE = <integer>
* This setting prevents Splunk Enterprise from rejecting events with timestamps
  that are out of order.
* Do not use this setting to filter events because Splunk Enterprise uses
  complicated heuristics for time parsing.
* Splunk Enterprise warns you if an event timestamp is more than <integer>
  seconds AFTER the previous timestamp and does not have the same time format
  as the majority of timestamps from the source.
* After Splunk Enterprise throws the warning, it only rejects an event if it
  cannot apply a timestamp to the event (for example, if Splunk cannot
  recognize the time of the event.)
* IMPORTANT: If your timestamps are wildly out of order, or you have logs that
  are written less than once a week, consider increasing this value.
* Defaults to 604800 (one week), maximum 2147483646.


#******************************************************************************
# Structured Data Header Extraction and configuration
#******************************************************************************

* This feature and all of its settings apply at input time, when data is
  first read by Splunk.  The setting is used on a Splunk system that has
  configured inputs acquiring the data.

# Special characters for Structured Data Header Extraction:
# Some unprintable characters can be described with escape sequences. The
# attributes that can use these characters specifically mention that
# capability in their descriptions below.
# \f : form feed       byte: 0x0c
# \s : space           byte: 0x20
# \t : horizontal tab  byte: 0x09
# \v : vertical tab    byte: 0x0b

INDEXED_EXTRACTIONS = < CSV|W3C|TSV|PSV|JSON >
* Tells Splunk the type of file and the extraction and/or parsing method
  Splunk should use on the file.
  CSV  - Comma separated value format
  TSV  - Tab-separated value format
  PSV  - pipe "|" separated value format
  W3C  - W3C Extended Extended Log File Format
  JSON - JavaScript Object Notation format
* These settings default the values of the remaining settings to the
  appropriate values for these known formats.
* Defaults to unset.

PREAMBLE_REGEX = <regex>
* Some files contain preamble lines. This attribute specifies a regular
  expression which allows Splunk to ignore these preamble lines, based on
  the pattern specified.

FIELD_HEADER_REGEX = <regex>
* A regular expression that specifies a pattern for prefixed headers. Note
  that the actual header starts after the pattern and it is not included in
  the header field.
* This attribute supports the use of the special characters described above.

HEADER_FIELD_LINE_NUMBER = <integer>
* Tells Splunk the line number of the line within the file that contains the
  header fields.  If set to 0, Splunk attempts to locate the header fields
  within the file automatically.
* The default value is set to 0.

FIELD_DELIMITER = <character>
* Tells Splunk which character delimits or separates fields in the specified
  file or source.
* This attribute supports the use of the special characters described above.

HEADER_FIELD_DELIMITER = <character>
* Tells Splunk which character delimits or separates header fields in the
  specified file or source.
* This attribute supports the use of the special characters described above.

FIELD_QUOTE = <character>
* Tells Splunk the character to use for quotes in the specified file or
  source.
* This attribute supports the use of the special characters described above.

HEADER_FIELD_QUOTE = <character>
* Specifies Splunk the character to use for quotes in the header of the
  specified file or source.
* This attribute supports the use of the special characters described above.

TIMESTAMP_FIELDS = [ <string>,..., <string>]
* Some CSV and structured files have their timestamp encompass multiple
  fields in the event separated by delimiters. This attribue tells Splunk to
  specify all such fields which constitute the timestamp in a
  comma-separated fashion.
* If not specified, Splunk tries to automatically extract the timestamp of
  the event.

FIELD_NAMES = [ <string>,..., <string>] 
* Some CSV and structured files might have missing headers. This attribute
  tells Splunk to specify the header field names directly.

MISSING_VALUE_REGEX = <regex>
* Tells Splunk the placeholder to use in events where no value is present.

JSON_TRIM_BRACES_IN_ARRAY_NAMES = <bool>
* Tell the json parser not to add the curly braces to array names.
* Note that enabling this will make json indextime extracted array fiels names
  inconsistant with spath search processor's naming convention.
* For a json document containing the following array object, with trimming 
  enabled a indextime field 'mount_point' will be generated instead of the 
  spath consistant field 'mount_point{}'
      "mount_point": ["/disk48","/disk22"]
* Defaults to false.

#******************************************************************************
# Field extraction configuration
#******************************************************************************

NOTE: If this is your first time configuring field extractions in
      props.conf, review the following information first.

There are three different "field extraction types" that you can use to
configure field extractions: TRANSFORMS, REPORT, and EXTRACT. They differ in
two significant ways: 1) whether they create indexed fields (fields
extracted at index time) or extracted fields (fields extracted at search
time), and 2), whether they include a reference to an additional component
called a "field transform," which you define separately in transforms.conf.

**Field extraction configuration: index time versus search time**

Use the TRANSFORMS field extraction type to create index-time field
extractions. Use the REPORT or EXTRACT field extraction types to create
search-time field extractions.

NOTE: Index-time field extractions have performance implications. Creating
      additions to Splunk's default set of indexed fields is ONLY
      recommended in specific circumstances.  Whenever possible, extract
      fields only at search time.

There are times when you may find that you need to change or add to your set
of indexed fields. For example, you may have situations where certain
search-time field extractions are noticeably impacting search performance.
This can happen when the value of a search-time extracted field exists
outside of the field more often than not. For example, if you commonly
search a large event set with the expression company_id=1 but the value 1
occurs in many events that do *not* have company_id=1, you may want to add
company_id to the list of fields extracted by Splunk at index time. This is
because at search time, Splunk will want to check each instance of the value
1 to see if it matches company_id, and that kind of thing slows down
performance when you have Splunk searching a large set of data.

Conversely, if you commonly search a large event set with expressions like
company_id!=1 or NOT company_id=1, and the field company_id nearly *always*
takes on the value 1, you may want to add company_id to the list of fields
extracted by Splunk at index time.

For more information about index-time field extraction, search the
documentation for "index-time extraction." For more information about
search-time field extraction, search the online documentation for
"search-time extraction."

**Field extraction configuration: field transforms vs. "inline" (props.conf only) configs**

The TRANSFORMS and REPORT field extraction types reference an additional
component called a field transform, which you define separately in
transforms.conf. Field transforms contain a field-extracting regular
expression and other attributes that govern the way that the transform
extracts fields. Field transforms are always created in conjunction with
field extraction stanzas in props.conf; they do not stand alone.

The EXTRACT field extraction type is considered to be "inline," which means
that it does not reference a field transform. It contains the regular
expression that Splunk uses to extract fields at search time. You can use
EXTRACT to define a field extraction entirely within props.conf--no
transforms.conf component is required.

**Search-time field extractions: Why use REPORT if EXTRACT will do?**

It's a good question. And much of the time, EXTRACT is all you need for
search-time field extraction. But when you build search-time field
extractions, there are specific cases that require the use of REPORT and the
field transform that it references. Use REPORT if you want to:

* Reuse the same field-extracting regular expression across multiple
  sources, source types, or hosts. If you find yourself using the same regex
  to extract fields across several different sources, source types, and
  hosts, set it up as a transform, and then reference it in REPORT
  extractions in those stanzas. If you need to update the regex you only
  have to do it in one place. Handy!
* Apply more than one field-extracting regular expression to the same
  source, source type, or host. This can be necessary in cases where the
  field or fields that you want to extract from a particular source, source
  type, or host appear in two or more very different event patterns.
* Set up delimiter-based field extractions. Useful if your event data
  presents field-value pairs (or just field values) separated by delimiters
  such as commas, spaces, bars, and so on.
* Configure extractions for multivalued fields. You can have Splunk append
  additional values to a field as it finds them in the event data.
* Extract fields with names beginning with numbers or underscores.
  Ordinarily, Splunk's key cleaning functionality removes leading numeric
  characters and underscores from field names. If you need to keep them,
  configure your field transform to turn key cleaning off.
* Manage formatting of extracted fields, in cases where you are extracting
  multiple fields, or are extracting both the field name and field value.

**Precedence rules for TRANSFORMS, REPORT, and EXTRACT field extraction types**

* For each field extraction, Splunk takes the configuration from the highest
  precedence configuration stanza (see precedence rules at the beginning of
  this file).
* If a particular field extraction is specified for a source and a source
  type, the field extraction for source wins out.
* Similarly, if a particular field extraction is specified in ../local/ for
  a <spec>, it overrides that field extraction in ../default/.


TRANSFORMS-<class> = <transform_stanza_name>, <transform_stanza_name2>,...
* Used for creating indexed fields (index-time field extractions).
* <class> is a unique literal string that identifies the namespace of the
  field you're extracting.
  **Note:** <class> values do not have to follow field name syntax
  restrictions. You can use characters other than a-z, A-Z, and 0-9, and
  spaces are allowed. <class> values are not subject to key cleaning.
* <transform_stanza_name> is the name of your stanza from transforms.conf.
* Use a comma-separated list to apply multiple transform stanzas to a single
  TRANSFORMS extraction. Splunk applies them in the list order. For example,
  this sequence ensures that the [yellow] transform stanza gets applied
  first, then [blue], and then [red]:
        [source::color_logs]
        TRANSFORMS-colorchange = yellow, blue, red

REPORT-<class> = <transform_stanza_name>, <transform_stanza_name2>,...
* Used for creating extracted fields (search-time field extractions) that
  reference one or more transforms.conf stanzas.
* <class> is a unique literal string that identifies the namespace of the
  field you're extracting.
  **Note:** <class> values do not have to follow field name syntax
  restrictions. You can use characters other than a-z, A-Z, and 0-9, and
  spaces are allowed. <class> values are not subject to key cleaning.
* <transform_stanza_name> is the name of your stanza from transforms.conf.
* Use a comma-separated list to apply multiple transform stanzas to a single
  REPORT extraction.
  Splunk applies them in the list order. For example, this sequence insures
  that the [yellow] transform stanza gets applied first, then [blue], and
  then [red]:
    [source::color_logs]
    REPORT-colorchange = yellow, blue, red

EXTRACT-<class> = [<regex>|<regex> in <src_field>]
* Used to create extracted fields (search-time field extractions) that do
  not reference transforms.conf stanzas.
* Performs a regex-based field extraction from the value of the source
  field.
* <class> is a unique literal string that identifies the namespace of the
  field you're extracting.
  **Note:** <class> values do not have to follow field name syntax
  restrictions. You can use characters other than a-z, A-Z, and 0-9, and
  spaces are allowed. <class> values are not subject to key cleaning.
* The <regex> is required to have named capturing groups. When the <regex>
  matches, the named capturing groups and their values are added to the
  event.
* dotall (?s) and multiline (?m) modifiers are added in front of the regex.
  So internally, the regex becomes (?ms)<regex>.
* Use '<regex> in <src_field>' to match the regex against the values of a
  specific field.  Otherwise it just matches against _raw (all raw event
  data).
* NOTE: <src_field> can only contain alphanumeric characters and underscore
  (a-z, A-Z, 0-9, and _).
* If your regex needs to end with 'in <string>' where <string> is *not* a
  field name, change the regex to end with '[i]n <string>' to ensure that
  Splunk doesn't try to match <string> to a field name.

KV_MODE = [none|auto|auto_escaped|multi|json|xml]
* Used for search-time field extractions only.
* Specifies the field/value extraction mode for the data.
* Set KV_MODE to one of the following:
  * none: if you want no field/value extraction to take place.
  * auto: extracts field/value pairs separated by equal signs.
  * auto_escaped: extracts fields/value pairs separated by equal signs and
                  honors \" and \\ as escaped sequences within quoted
                  values, e.g field="value with \"nested\" quotes"
  * multi: invokes the multikv search command to expand a tabular event into
           multiple events.
  * xml : automatically extracts fields from XML data.
  * json: automatically extracts fields from JSON data.
* Setting to 'none' can ensure that one or more user-created regexes are not
  overridden by automatic field/value extraction for a particular host,
  source, or source type, and also increases search performance.
* Defaults to auto.
* The 'xml' and 'json' modes will not extract any fields when used on data
  that isn't of the correct format (JSON or XML).

AUTO_KV_JSON = [true|false]
* Used for search-time field extractions only.
* Specifies whether to try json extraction automatically.
* Defaults to true.

KV_TRIM_SPACES = true|false
* Modifies the behavior of KV_MODE when set to auto, and auto_escaped.
* Traditionally, automatically identified fields have leading and trailing
  whitespace removed from their values.
  * Example event: 2014-04-04 10:10:45 myfield=" apples "
    would result in a field called 'myfield' with a value of 'apples'.
* If this value is set to false, then external whitespace then this outer
  space is retained.
  * Example: 2014-04-04 10:10:45 myfield=" apples "
    would result in a field called 'myfield' with a value of ' apples '.
* The trimming logic applies only to space characters, not tabs, or other
  whitespace.
* NOTE: The Splunk UI currently has limitations with displaying and
  interactively clicking on  fields that have leading or trailing
  whitespace.  Field values with leading or trailing spaces may not look
  distinct in the event viewer, and clicking on a field value will typically
  insert the term into the search string without its embedded spaces.
  * These warts are not specific to this feature.  Any such embedded spaces
    will behave this way.
  * The Splunk search language and included commands will respect the spaces.
* Defaults to true.

CHECK_FOR_HEADER = [true|false]
* Used for index-time field extractions only.
* Set to true to enable header-based field extraction for a file.
* If the file has a list of columns and each event contains a field value
  (without field name), Splunk picks a suitable header line to use to for
  extracting field names.
* If the file has a list of columns and each event contains a field value
  (without a field name), Splunk picks a suitable header line to use for
  field extraction.
* Can only be used on the basis of [<sourcetype>] or [source::<spec>],
  not [host::<spec>].
* Disabled when LEARN_SOURCETYPE = false.
* Will cause the indexed source type to have an appended numeral; for
  example, sourcetype-2, sourcetype-3, and so on.
* The field names are stored in etc/apps/learned/local/props.conf.
  * Because of this, this feature will not work in most environments where
    the data is forwarded.
* This setting applies at input time, when data is first read by Splunk.
  The setting is used on a Splunk system that has configured inputs
  acquiring the data.
* Defaults to false.

SEDCMD-<class> = <sed script>
* Only used at index time.
* Commonly used to anonymize incoming data at index time, such as credit
  card or social security numbers. For more information, search the online
  documentation for "anonymize data."
* Used to specify a sed script which Splunk applies to the _raw field.
* A sed script is a space-separated list of sed commands. Currently the
  following subset of sed commands is supported:
    * replace (s) and character substitution (y).
* Syntax:
    * replace - s/regex/replacement/flags
      * regex is a perl regular expression (optionally containing capturing
        groups).
      * replacement is a string to replace the regex match. Use \n for back
        references, where "n" is a single digit.
      * flags can be either: g to replace all matches, or a number to
        replace a specified match.
    * substitute - y/string1/string2/
      * substitutes the string1[i] with string2[i]

FIELDALIAS-<class> = (<orig_field_name> AS <new_field_name>)+
* Use this to apply aliases to a field. The original field is not removed.
  This just means that the original field can be searched on using any of
  its aliases.
* You can create multiple aliases for the same field.
* <orig_field_name> is the original name of the field.
* <new_field_name> is the alias to assign to the field.
* You can include multiple field alias renames in the same stanza.
* Field aliasing is performed at search time, after field extraction, but
  before calculated fields (EVAL-* statements) and lookups.
  This means that:
        * Any field extracted at search time can be aliased.
        * You can specify a lookup based on a field alias.
        * You cannot alias a calculated field.

EVAL-<fieldname> = <eval statement>
* Use this to automatically run the <eval statement> and assign the value of
  the output to <fieldname>. This creates a "calculated field."
* When multiple EVAL-* statements are specified, they behave as if they are
* run in parallel, rather than in any particular sequence.
  For example say you have two statements: EVAL-x = y*2 and EVAL-y=100. In
  this case, "x" will be assigned the original value of "y * 2," not the
  value of "y" after it is set to 100.
* Splunk processes calculated fields after field extraction and field
  aliasing but before lookups. This means that:
  * You can use a field alias in the eval statement for a calculated
    field.
  * You cannot use a field added through a lookup in an eval statement for a
    calculated field.

LOOKUP-<class> = $TRANSFORM (<match_field> (AS <match_field_in_event>)?)+ (OUTPUT|OUTPUTNEW (<output_field> (AS <output_field_in_event>)? )+ )?
* At search time, identifies a specific lookup table and describes how that
  lookup table should be applied to events.
* <match_field> specifies a field in the lookup table to match on.
  * By default Splunk looks for a field with that same name in the event to
    match with (if <match_field_in_event> is not provided)
  * You must provide at least one match field. Multiple match fields are
    allowed.
* <output_field> specifies a field in the lookup entry to copy into each
  matching event, where it will be in the field <output_field_in_event>.
  * If you do not specify an <output_field_in_event> value, Splunk 
    uses <output_field>.
  * A list of output fields is not required.
* If they are not provided, all fields in the lookup table except for the
  match fields (and the timestamp field if it is specified) will be output
  for each matching event.
* If the output field list starts with the keyword "OUTPUTNEW" instead of
  "OUTPUT", then each outputfield is only written out if it did not previous
  exist. Otherwise, the output fields are always overridden. Any event that
  has all of the <match_field> values but no matching entry in the lookup
  table clears all of the output fields.  NOTE that OUTPUTNEW behavior has
  changed since 4.1.x (where *none* of the output fields were written to if
  *any* of the output fields previously existed).
* Splunk processes lookups after it processes field extractions, field
  aliases, and calculated fields (EVAL-* statements). This means that you
  can use extracted fields, aliased fields, and calculated fields to specify
  lookups. But you can't use fields discovered by lookups in the
  configurations of extracted fields, aliased fields, or calculated fields.
* The LOOKUP- prefix is actually case-insensitive. Acceptable variants include:
   LOOKUP_<class> = [...]
   LOOKUP<class>  = [...]
   lookup_<class> = [...]
   lookup<class>  = [...]

#******************************************************************************
# Binary file configuration
#******************************************************************************

NO_BINARY_CHECK = [true|false]
* When set to true, Splunk processes binary files.
* Can only be used on the basis of [<sourcetype>], or [source::<source>],
  not [host::<host>].
* Defaults to false (binary files are ignored).
* This setting applies at input time, when data is first read by Splunk.
  The setting is used on a Splunk system that has configured inputs
  acquiring the data.

detect_trailing_nulls = [auto|true|false]
* When enabled, Splunk will try to avoid reading in null bytes at the end of
  a file.
* When false, splunk will assume that all the bytes in the file should be
  read and indexed.
* Set this value to false for UTF-16 and other encodings (CHARSET) values
  that can have null bytes as part of the character text.
* Subtleties of 'true' vs 'auto':
  * 'true' is the splunk-on-windows historical behavior of trimming all null
           bytes.
  * 'auto' is currently a synonym for true but will be extended to be
           sensitive to the charset selected (ie quantized for multi-byte
           encodings, and disabled for unsafe variable-width encdings)
* This feature was introduced to work around programs which foolishly
  pre-allocate their log files with nulls and fill in data later.  The
  well-known case is Internet Information Server.
* This setting applies at input time, when data is first read by Splunk.
  The setting is used on a Splunk system that has configured inputs
  acquiring the data.
* Defaults to false on *nix, true on windows.

#******************************************************************************
# Segmentation configuration
#******************************************************************************

SEGMENTATION = <segmenter>
* Specifies the segmenter from segmenters.conf to use at index time for the
  host, source, or sourcetype specified by <spec> in the stanza heading.
* Defaults to indexing.

SEGMENTATION-<segment selection> = <segmenter>
* Specifies that Splunk Web should use the specific segmenter (from
  segmenters.conf) for the given <segment selection> choice.
* Default <segment selection> choices are: all, inner, outer, raw. For more
  information see the Admin Manual.
* Do not change the set of default <segment selection> choices, unless you
  have some overriding reason for doing so. In order for a changed set of
  <segment selection> choices to appear in Splunk Web, you will need to edit
  the Splunk Web UI.

#******************************************************************************
# File checksum configuration
#******************************************************************************

CHECK_METHOD = [endpoint_md5|entire_md5|modtime]
* Set CHECK_METHOD endpoint_md5 to have Splunk checksum of the first and
  last 256 bytes of a file. When it finds matches, Splunk lists the file as
  already indexed and indexes only new data, or ignores it if there is no
  new data.
* Set CHECK_METHOD = entire_md5 to use the checksum of the entire file.
* Set CHECK_METHOD = modtime to check only the modification time of the
  file.
* Settings other than endpoint_md5 cause Splunk to index the entire file for
  each detected change.
* Important: this option is only valid for [source::<source>] stanzas.
* This setting applies at input time, when data is first read by Splunk.
  The setting is used on a Splunk system that has configured inputs
  acquiring the data.
* Defaults to endpoint_md5.

initCrcLength = <integer>
* See documentation in inputs.conf.spec.

#******************************************************************************
# Small file settings
#******************************************************************************

PREFIX_SOURCETYPE = [true|false]
* NOTE: this attribute is only relevant to the "[too_small]" sourcetype.
* Determines the source types that are given to files smaller than 100
  lines, and are therefore not classifiable.
* PREFIX_SOURCETYPE = false sets the source type to "too_small."
* PREFIX_SOURCETYPE = true sets the source type to "<sourcename>-too_small",
  where "<sourcename>" is a cleaned up version of the filename.
  * The advantage of PREFIX_SOURCETYPE = true is that not all small files
    are classified as the same source type, and wildcard searching is often
    effective.
  * For example, a Splunk search of "sourcetype=access*" will retrieve
    "access" files as well as "access-too_small" files.
* This setting applies at input time, when data is first read by Splunk.
  The setting is used on a Splunk system that has configured inputs
  acquiring the data.
* Defaults to true.


#******************************************************************************
# Sourcetype configuration
#******************************************************************************

sourcetype = <string>
* Can only be set for a [source::...] stanza.
* Anything from that <source> is assigned the specified source type.
* Is used by file-based inputs, at input time (when accessing logfiles) such
  as on a forwarder, or indexer monitoring local files.
* sourcetype assignment settings on a system receiving forwarded splunk data
  will not be applied to forwarded data.
* For logfiles read locally, data from logfiles matching <source> is
  assigned the specified source type.
* Defaults to empty.

# The following attribute/value pairs can only be set for a stanza that
# begins with [<sourcetype>]:

rename = <string>
* Renames [<sourcetype>] as <string> at search time
* With renaming, you can search for the [<sourcetype>] with
  sourcetype=<string>
* To search for the original source type without renaming it, use the 
  field _sourcetype.
* Data from a a renamed sourcetype will only use the search-time
  configuration for the target sourcetype. Field extractions
  (REPORTS/EXTRACT) for this stanza sourcetype will be ignored.
* Defaults to empty.

invalid_cause = <string>
* Can only be set for a [<sourcetype>] stanza.
* If invalid_cause is set, the Tailing code (which handles uncompressed
  logfiles) will not read the data, but hand it off to other components or
  throw an error.
* Set <string> to "archive" to send the file to the archive processor
  (specified in unarchive_cmd).
* When set to "winevt", this causes the file to be handed off to the
  eventlog input processor.
* Set to any other string to throw an error in the splunkd.log if you are
  running Splunklogger in debug mode.
* This setting applies at input time, when data is first read by Splunk.
  The setting is used on a Splunk system that has configured inputs
  acquiring the data.
* Defaults to empty.

is_valid = [true|false]
* Automatically set by invalid_cause.
* This setting applies at input time, when data is first read by Splunk,
  such as on a forwarder.
* This setting applies at input time, when data is first read by Splunk.
  The setting is used on a Splunk system that has configured inputs
  acquiring the data.
* DO NOT SET THIS.
* Defaults to true.

unarchive_cmd = <string>
* Only called if invalid_cause is set to "archive".
* This field is only valid on [source::<source>] stanzas.
* <string> specifies the shell command to run to extract an archived source.
* Must be a shell command that takes input on stdin and produces output on
  stdout.
* Use _auto for Splunk's automatic handling of archive files (tar, tar.gz,
  tgz, tbz, tbz2, zip)
* This setting applies at input time, when data is first read by Splunk.
  The setting is used on a Splunk system that has configured inputs
  acquiring the data.
* Defaults to empty.

unarchive_sourcetype = <string>
* Sets the source type of the contents of the matching archive file. Use
  this field instead of the sourcetype field to set the source type of
  archive files that have the following extensions: gz, bz, bz2, Z.
* If this field is empty (for a matching archive file props lookup) Splunk
  strips off the archive file's extension (.gz, bz etc) and lookup another
  stanza to attempt to determine the sourcetype.
* This setting applies at input time, when data is first read by Splunk.
  The setting is used on a Splunk system that has configured inputs
  acquiring the data.
* Defaults to empty.

LEARN_SOURCETYPE = [true|false]
* Determines whether learning of known or unknown sourcetypes is enabled.
  * For known sourcetypes, refer to LEARN_MODEL.
  * For unknown sourcetypes, refer to the rule:: and delayedrule::
    configuration (see below).
* Setting this field to false disables CHECK_FOR_HEADER as well (see above).
* This setting applies at input time, when data is first read by Splunk.
  The setting is used on a Splunk system that has configured inputs
  acquiring the data.
* Defaults to true.

LEARN_MODEL = [true|false]
* For known source types, the file classifier adds a model file to the
  learned directory.
* To disable this behavior for diverse source types (such as sourcecode,
  where there is no good exemple to make a sourcetype) set LEARN_MODEL =
  false.
* This setting applies at input time, when data is first read by Splunk.
  The setting is used on a Splunk system that has configured inputs
  acquiring the data.
* Defaults to false.

maxDist = <integer>
* Determines how different a source type model may be from the current file.
* The larger the maxDist value, the more forgiving Splunk will be with
  differences.
  * For example, if the value is very small (for example, 10), then files
    of the specified sourcetype should not vary much.
  * A larger value indicates that files of the given source type can vary
    quite a bit.
* If you're finding that a source type model is matching too broadly, reduce
  its maxDist value by about 100 and try again. If you're finding that a
  source type model is being too restrictive, increase its maxDist value by
  about 100 and try again.
* This setting applies at input time, when data is first read by Splunk.
  The setting is used on a Splunk system that has configured inputs
  acquiring the data.
* Defaults to 300.

# rule:: and delayedrule:: configuration

MORE_THAN<optional_unique_value>_<number> = <regular expression> (empty)
LESS_THAN<optional_unique_value>_<number> = <regular expression> (empty)

* These settingg apply at input time, when data is first read by Splunk,
  such as on a forwarder.

An example:

[rule::bar_some]
sourcetype = source_with_lots_of_bars
# if more than 80% of lines have "----", but fewer than 70% have "####"
# declare this a "source_with_lots_of_bars"
MORE_THAN_80 = ----
LESS_THAN_70 = ####

A rule can have many MORE_THAN and LESS_THAN patterns, and all are required
for the rule to match.

#******************************************************************************
# Annotation Processor configured
#******************************************************************************

ANNOTATE_PUNCT = [true|false]
* Determines whether to index a special token starting with "punct::"
  * The "punct::" key contains punctuation in the text of the event.
    It can be useful for finding similar events
  * If it is not useful for your dataset, or if it ends up taking
    too much space in your index it is safe to disable it
* Defaults to true.

#******************************************************************************
# Header Processor configuration
#******************************************************************************

HEADER_MODE = <empty> | always | firstline | none
* Determines whether to use the inline ***SPLUNK*** directive to rewrite index-time fields.
  * If "always", any line with ***SPLUNK*** can be used to rewrite
    index-time fields.
  * If "firstline", only the first line can be used to rewrite 
    index-time fields.
  * If "none", the string ***SPLUNK*** is treated as normal data.
  * If <empty>, scripted inputs take the value "always" and file inputs
    take the value "none".
* This setting applies at input time, when data is first read by Splunk.
  The setting is used on a Splunk system that has configured inputs
  acquiring the data.
* Defaults to <empty>.

#******************************************************************************
# Internal settings
#******************************************************************************

# NOT YOURS. DO NOT SET.

_actions = <string>
* Internal field used for user-interface control of objects.
* Defaults to "new,edit,delete".

pulldown_type = <bool>
* Internal field used for user-interface control of source types.
* Defaults to empty.

given_type = <string>
* Internal field used by the CHECK_FOR_HEADER feature to remember the
  original sourcetype.
* This setting applies at input time, when data is first read by Splunk.
  The setting is used on a Splunk system that has configured inputs
  acquiring the data.
* Default to unset.

#******************************************************************************
# Sourcetype Category and Descriptions
#******************************************************************************

description = <string>
* Field used to describe the sourcetype. Does not affect indexing behaviour.
* Defaults to unset.
category = <string>
* Field used to classify sourcetypes for organization in the front end. Case
  sensitive. Does not affect indexing behaviour.
* Defaults to unset.
