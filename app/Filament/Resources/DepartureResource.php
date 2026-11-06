<?php

namespace App\Filament\Resources;

use App\Filament\Resources\DepartureResource\Pages;
use App\Filament\Resources\DepartureResource\RelationManagers;
use App\Models\Departure;
use App\Models\Tour;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class DepartureResource extends Resource
{
    protected static ?string $model = Departure::class;

    protected static ?string $navigationIcon = 'heroicon-o-calendar';

    protected static ?string $navigationGroup = 'Content';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('tour_id')
                    ->relationship('tour', 'title')
                    ->required()
                    ->searchable()
                    ->preload(),
                Forms\Components\DatePicker::make('departure_date')
                    ->required()
                    ->native(false)
                    ->displayFormat('M d, Y')
                    ->afterOrEqual(today()),
                Forms\Components\TextInput::make('capacity')
                    ->required()
                    ->numeric()
                    ->default(20),
                Forms\Components\TextInput::make('available_seats')
                    ->required()
                    ->numeric()
                    ->default(20),
                Forms\Components\TextInput::make('price_adjustment')
                    ->numeric()
                    ->prefix('$')
                    ->default(0),
                Forms\Components\Toggle::make('is_available')
                    ->default(true),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('tour.title')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('departure_date')
                    ->date()
                    ->sortable(),
                Tables\Columns\TextColumn::make('capacity')
                    ->sortable(),
                Tables\Columns\TextColumn::make('available_seats')
                    ->sortable(),
                Tables\Columns\TextColumn::make('price_adjustment')
                    ->money('usd'),
                Tables\Columns\TextColumn::make('total_price')
                    ->getStateUsing(fn (Departure $record) => $record->total_price)
                    ->money('usd'),
                Tables\Columns\IconColumn::make('is_available')
                    ->boolean(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('tour_id')
                    ->relationship('tour', 'title'),
                Tables\Filters\TernaryFilter::make('is_available'),
            ])
            ->actions([
                Tables\Actions\EditAction::class,
                Tables\Actions\DeleteAction::class,
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::class,
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListDepartures::route('/'),
            'create' => Pages\CreateDeparture::route('/create'),
            'edit' => Pages\EditDeparture::route('/{record}/edit'),
        ];
    }
}
